import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './controllers/notesControllers.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static('dist'))

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

app.use('/api/notes', router)

app.listen(process.env.PORT, () =>
  console.log('server running on port ' + process.env.PORT)
)
