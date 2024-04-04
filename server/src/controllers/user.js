const { Router } = require("express");
const userService = require("../services/user");

class UserController {
  userService;

  async init() {
    this.userService = await userService();
    const router = Router();
    router.get("/", this.getAll);
    router.get("/:userId", this.getOne);
    router.delete("/:userId", this.delete);
    return router;
  }

  getAll = async (req, res) => {
    const { pageIndex, pageSize } = req.query;
    const userList = await this.userService.find({ pageIndex, pageSize });

    res.send({ success: true, data: userList });
  };

  getOne = async (req, res) => {
    const { userId } = req.params;
    const userList = await this.userService.find({ id: userId });

    if (userList.length) {
      res.send({ success: true, data: userList[0] });
    } else {
      res.status(404).send({ success: false, data: null });
    }
  };

  delete = async (req, res) => {
    const { userId } = req.params;
    const success = await this.userService.remove({ id: userId });

    if (!success) {
      res.status(404);
    }
    res.send({ success });
  };
}

module.exports = async () => {
  const c = new UserController();
  return await c.init();
};
