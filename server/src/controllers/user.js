const { Router } = require("express");
const userService = require("../services/user");

class UserController {
  userService;

  async init() {
    this.userService = await userService();
    const router = Router();
    router.get("/:userId", this.getOne);
    return router;
  }

  getOne = async (req, res) => {
    const { logging } = req;
    const { userId } = req.params;
    const userList = await this.userService.find({ id: userId, logging });

    if (userList.length) {
      res.send({ success: true, data: userList[0] });
    } else {
      res.status(404).send({ success: false, data: null });
    }
  };
}

module.exports = async () => {
  const c = new UserController();
  return await c.init();
};
