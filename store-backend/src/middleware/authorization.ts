import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader ? authorizationHeader.split(' ')[1] : ''
        res.locals.user = jwt.verify(token, process.env.TOKEN_SECRET as string);

        next()
    } catch (error) {
        res.status(401).json(error)
    }
}

export default verifyToken;