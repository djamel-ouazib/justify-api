import { Router, Request, Response } from 'express'
import { getOrCreateToken } from '../services/tokenStore'

const router = Router()

router.post('/', (req: Request, res: Response): void => {
    const { email } = req.body

    if (!email || typeof email !== 'string') {
        res.status(400).json({ error: 'email is required' })
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        res.status(400).json({ error: 'Invalid email format' })
        return
    }

    const token = getOrCreateToken(email)
    res.status(200).json({ token })
})

export default router
