import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

const PORT = Number.parseInt(process.env.PORT, 10)
const app = express()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(cors())

app.get('/status', (req, res) => {
  return res.json({
    data: {
      appName: 'Rock, Paper and Scissors Game',
      appVersion: process.env.npm_package_version,
    }
  })
})
