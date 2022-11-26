import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'

import createMQConsumer from './consumer'

const PORT = 3001
const QUEUE_NAME = "eventdriven"

const app = express()
require('dotenv').config()
const AMQP_URL = process.env.AMQP_URL as string
const consumer = createMQConsumer(AMQP_URL, QUEUE_NAME)

consumer()
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})