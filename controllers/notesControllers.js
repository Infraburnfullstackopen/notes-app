import express from 'express'
const router = express.Router()
import Note from '../models/notesModels.js'

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find()
    res.json(notes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Add a new Category
router.post('/category', async (req, res) => {
  const { id, title, sections = [] } = req.body // Destructure and set a default for sections

  const note = new Note({
    id,
    title,
    sections,
  })

  try {
    const newNote = await note.save()
    res.status(201).json(newNote)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Edit a Category
router.patch('/category/:id', async (req, res) => {
  const { id } = req.params
  const { title, sections } = req.body

  if (title.length > 0) {
    try {
      const note = await Note.findById(id)
      note.title = title
      note.sections = sections
      const updatedNote = await note.save()
      res.json(updatedNote)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  } else {
    try {
      const note = await Note.findById(id)
      const updatedNote = await note.deleteOne()
      res.json(updatedNote)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
})

// Add a new SubCategory (ARREGLAR)
router.patch('/subcategory', async (req, res) => {
  const { id, _id, title, sections = [] } = req.body // Destructure and set a default for sections

  try {
    const newNote = await Note.findOneAndUpdate(
      { _id },
      { id, title, sections },
      { new: true }
    )
    res.status(201).json(newNote)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Edit a SubCategory
router.patch('/subcategory/edit', async (req, res) => {
  const { _id, title, sections = [] } = req.body // Destructure and set a default for sections
  try {
    const newNote = await Note.findOneAndUpdate(
      { _id },
      { title, sections },
      { new: true }
    )
    res.status(201).json(newNote)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Add a note
router.patch('/note', async (req, res) => {
  const { id, _id, title, sections = [] } = req.body // Destructure and set a default for sections

  try {
    const newNote = await Note.findOneAndUpdate(
      { _id },
      { id, title, sections },
      { new: true }
    )
    res.status(201).json(newNote)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Edit a note
router.patch('/note/:id', async (req, res) => {
  const { id, _id, title, sections } = req.body

  try {
    const note = await Note.findOneAndUpdate(
      { _id },
      { id, title, sections },
      { new: true }
    )
    res.json(note)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
