const mongoose = require('mongoose')
NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
})

const noteModel = mongoose.model('note', NoteSchema, 'notes')

// module.exports = mongoose.model('anotherNote', noteSchema, 'myNotes')
module.exports = noteModel
