import { Router, Request, Response } from 'express'
import { authMiddleware } from '../middleware/auth'
import { justifyText } from '../services/justifyText'
import { checkRateLimit } from '../services/rateLimit'

const router = Router()

router.post('/', authMiddleware, (req: Request, res: Response): void => {
    const text = req.body

    if (typeof text !== 'string' || text.trim() === '') {
        res.status(400).json({ error: 'Body must be non-empty text/plain' })
        return
    }

    const wordCount = text.trim().split(/\s+/).length
    const token = res.locals.token as string

    if (!checkRateLimit(token, wordCount)) {
        res.status(402).json({
            error: 'Payment Required — daily word limit of 80,000 exceeded',
        })
        return
    }

    const justified = justifyText(text)
    res.setHeader('Content-Type', 'text/plain')
    res.status(200).send(justified)
})

export default router
