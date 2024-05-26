import express from 'express'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import { config } from 'dotenv'
import authRouter from '~/routes/auth.routes'
import cors from 'cors'
config()
databaseService.connect()

const port = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/', (req, res, next) => {
  res.json({ message: 'Test api success' })
})

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
