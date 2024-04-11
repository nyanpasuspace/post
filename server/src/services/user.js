const { User } = require('../models');

class UserService {
    async init() {}
    async find({ id, logging }) {
        return [await User.findByPk(id, { logging })];
    }

    async create({ user, logging }) {
        return await User.create(user, { logging });
    }

    async modify({ id, values, logging }) {
        const target = await User.findByPk(id);
        console.log(values);
        if(!target) {
            return null;
        }
        target.set(values);
        return await target.save({ logging });
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