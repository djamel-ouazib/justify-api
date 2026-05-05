import { Request, Response, NextFunction } from 'express'
import { isValidToken } from '../services/tokenStore'

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers['authorization']

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            error: 'Missing or invalid Authorization header',
        })
        return
    }

    const token = authHeader.slice(7)

    if (!isValidToken(token)) {
        res.status(401).json({ error: 'Invalid token' })
        return
    }

    res.locals.token = token
    next()
}
