import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { generateCode } from './api/generate'
import path from 'path'

// Load environment variables from the root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.post('/api/generate', generateCode)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
  console.log('Environment variables loaded:', {
    port: process.env.PORT,
    hasApiKey: !!process.env.OPENAI_API_KEY
  })
}) 