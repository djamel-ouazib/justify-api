import express from 'express'
import tokenRouter from './routes/token'
import justifyRouter from './routes/justify'

const app = express()

app.use(express.json())
app.use(express.text())

app.use('/api/token', tokenRouter)
app.use('/api/justify', justifyRouter)

app.get('/health', (_, res) => {
    res.json({ status: 'ok' })
})

app.use((_, res) => {
    res.status(404).json({ error: 'Route not found' })
})

export default app
