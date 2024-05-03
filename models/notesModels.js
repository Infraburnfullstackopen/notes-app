import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sections: {
    type: Array,
    required: false,
  },
  id: {
    type: Number,
    required: true,
  },
})

const Note = mongoose.model('Note', noteSchema, 'data')

export default Note
