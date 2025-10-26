export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getUsers = async (_req, res, next) => {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  getUser = async (req, res, next) => {
    try {
      const user = await this.userService.getUser(req.user);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const user = await this.userService.updateUser(req.user, req.body);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      await this.userService.deleteUser(req.user);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  };
}
