const { User } = require('../models');

class UserService {
    async init() {}
    async find({ id, pageIndex = 0, pageSize = 10 }) {
        if(id) {
            return [await User.findByPk(id)];
        }

        return await User.findAll({
            offset: pageIndex * pageSize,
            limit: pageSize,
        });
    }

    async remove({ id }) {
        const target = await User.findByPk(id);
        if(!target) {
            return false;
        }
        return target.destroy();
    }

    async create({ name, password }) {
        return await User.create(name, password);
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