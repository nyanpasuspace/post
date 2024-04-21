const { User } = require('../models');
const { Op, Sequelize } = require("sequelize");
class UserService {
    async init() {}
    async find({ id, where, logging }) {
        if(id) {
            return [await User.findByPk(id, { logging })];
        }
        return await User.findAll({
            where,
            logging
        })
    }

    async create({ user, logging }) {
        return await User.create(user, { logging });
    }

    async modify({ id, values, logging }) {
        const target = await User.findByPk(id);
        // console.log(values);
        if(!target) {
            return null;
        }
        target.set(values);
        return await target.save({ logging });
    }

    async getSpecialMessage({ query, logging }) {
        const targetUser = await User.findAll({
            where: {
                is_live: 0,
                is_send_to_world: 1,
                message: {
                    [Op.substring]: `${query}`
                }
            },
            logging
        });
        if(!targetUser) {
            return null;
        }
        return targetUser;
    }

    async getPublicMessage({ logging }) {
        const targetUser = await User.findAll({
            where: {
                is_live: 0,
                is_send_to_world: 1,
            },
            logging
        });
        if(!targetUser) {
            return null;
        }
        return targetUser;
    }
}

// 单例模式
let userService;
module.exports = async function () {
    if (!userService) {
        userService = new UserService();
        await userService.init();
    }
    return userService;
};