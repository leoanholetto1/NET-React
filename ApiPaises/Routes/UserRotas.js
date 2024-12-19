import * as express from "express";
import UserController from "../Controllers/UserController.js"

const uroutes = express.Router();
const userController = new UserController();

//autentica o usuario
uroutes.get("/login", userController.login);

export default uroutes