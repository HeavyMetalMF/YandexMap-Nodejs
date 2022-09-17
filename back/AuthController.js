import User from "./models/User.js";
import bcrypt from 'bcrypt';
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken';
import {secretKey} from './secret.js'

const generateAccessToken = (id) => {
   const payload = {id}
    return jwt.sign(payload, secretKey.secret, {expiresIn: "24h"})

}

class AuthController {
    async register (req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate){
                return res.status(400).json({message: "Такой пользователь уже существует"})
            }
            const hashedPassword = bcrypt.hashSync(password, 7)
            const user = await User.create({username, password: hashedPassword});
            return res.json(user)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Register error'})
        }
    }

    async login (req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user){
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword){
                return res.status(400).json({message: 'Пароль неверный'})
            }
            const token = generateAccessToken(user._id)
            return res.json({token, id: user._id})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

export default new AuthController();