const { basename } = require('path');
const schedule = require('node-schedule');
const { sequelize, ScheduleLock } = require('../models');
const { createRestAPIClient } =  require('masto');
const logger = require('../utils/logger');
const userService = require('../services/user');
// 当前任务的锁名称
const LOCK_NAME = basename(__dirname);
// 锁的最长占用时间
const LOCK_TIMEOUT = 15 * 60 * 1000;
// 分布式任务并发数
const CONCURRENCY = 1;

class MastodonPing {
    userService;
    async init() {
        this.userService = await userService();
        // 1:01:30 每天
        schedule.scheduleJob('30 1 1 * * *', this.pingMastodon);
    }

    pingMastodon = async() => {
        // 上锁
        const lockUpT = await sequelize.transaction();
        try {
            const [lock] = await ScheduleLock.findOrCreate({
                where: {
                    name: LOCK_NAME
                },
                default: {
                    name: LOCK_NAME,
                    counter: 0
                },
                transaction: lockUpT
            });
            if(lock.counter >= CONCURRENCY) {
                if(Date.now() - lock.updatedAt.valueOf() > LOCK_TIMEOUT) {
                    lock.counter--;
                    await lock.save({
                        transaction: lockUpT
                    });
                    await lockUpT.commit();
                    return;
                }
            }
            lock.counter++;
            await lock.save({
                transaction: lockUpT
            });
            await lockUpT.commit();
        }
        catch(error) {
            logger.error(error);
            await lockUpT.rollback();
            return;
        }
        try {
            const d = new Date();
            const now = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + d.getDate();
            const nowStamp = new Date(now) - 0;
            const userList = await this.userService.find({
                where: {
                    is_live: 1,
                }
            });
            // 检查 mastodon 活动，没有设置 Token 的用户，跳过检查
            userList.forEach(async user => {
                console.log('userId: ' + user.id);
                try {
                    const instance = user.mastodon_instance;
                    const token = user.mastodon_token;
                    const masto = createRestAPIClient({
                        url: instance,
                        accessToken: token,
                        timeout: 1000 * 10
                    });
                    const account = await masto.v1.accounts.verifyCredentials();
                    const lastStatusDate = account.lastStatusAt;
                    const lastStatusDateStamp = new Date(lastStatusDate) - 0;
                    let distanceDays = 0;
                    // console.log(now);
                    // console.log(lastStatusDate);
                    // console.log(nowStamp);
                    // console.log(lastStatusDateStamp);
                    if(nowStamp > lastStatusDateStamp) {
                        distanceDays = (nowStamp - lastStatusDateStamp) / (24 * 60 * 60 * 1000);
                    }
                    else {
                        distanceDays = (lastStatusDateStamp - nowStamp) / (24 * 60 * 60 * 1000);
                    }
                    if(true) {
                        // 超过期限，发送，同时设置 died
                        try {
                            const status = await masto.v1.statuses.create({
                                status: user.message,
                                visibility: 'public'
                            });
                            // console.log(status);
                            user.is_live = false;
                            await this.userService.modify({
                                id: user.id,
                                values: {
                                    is_live: user.is_live,
                                }
                            })
                        }
                        catch(error) {
                            logger.error(error);
                        }
                    }
                    else {

                    }
                }
                catch(error) {
                    console.error(error);
                }
            });
            console.log("遍历检查用户 Mastodon 状态完成");
        }
        catch(error) {
            logger.error(error);
        }
        // 解锁
        const lockDownT = await sequelize.transaction();
        try {
            const lock = await ScheduleLock.findOne({
                where: { name: LOCK_NAME },
                transaction: lockDownT,
            });
            if (lock.counter > 0) {
                lock.counter--;
                await lock.save({ transaction: lockDownT });
            }
            await lockDownT.commit();
        } 
        catch {
            await lockDownT.rollback();
        }
    }
}
module.exports = async () => {
  const s = new MastodonPing();
  await s.init();
};
