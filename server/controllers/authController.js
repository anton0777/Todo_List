export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  registerUser = async (req, res, next) => {
    try {
      const user = await this.authService.registerUser(req.body);
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: user.token,
      });
    } catch (err) {
      next(err);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const user = await this.authService.loginUser(req.body);
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: user.token,
      });
    } catch (err) {
      next(err);
    }
  };
}
