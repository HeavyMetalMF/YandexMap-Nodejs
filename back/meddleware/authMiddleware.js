import jwt from "jsonwebtoken";
import {secretKey} from '../secret.js'

export const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS'){
        next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            console.log('нет токена')
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }
        const decodedData = jwt.verify(token, secretKey.secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: 'Пользователь не авторизован'})
    }
}