const mongoose = require('mongoose')

const NoteScheme = new mongoose.Schema({
  id_note: Number,
  title: String,
  body: String,
  created_at: Date,
})

module.exports = mongoose.model('note', NoteScheme, 'myNotes')
