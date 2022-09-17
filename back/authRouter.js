import Router from "express";
import AuthController from "./AuthController.js";
import {check} from "express-validator";

const router = new Router();

router.post('/login', AuthController.login)
router.post('/register',[
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль не может быть менее 3 символов').isLength({min: 3}),
] , AuthController.register)

export default router;