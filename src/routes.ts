import { Router } from "express";
import { userController } from "./controllers/UserController";
import { AuthMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

routes.post("/user", userController.create);
routes.post("/login", userController.login);
routes.get("/profile", AuthMiddleware, userController.getProfileData);

export { routes };
