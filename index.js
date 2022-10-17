const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bodyParser = require('body-parser')
const NoteSchema = require('./noteschema')

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const dbUrl = 'mongodb+srv://thanglemon204:Chaungoanbacho123@cluster0.tpu0g9i.mongodb.net/myFirstDatabae?retryWrites=true&w=majority'
const port = 3001
const app = express()

mongoose.connect(dbUrl, connectionParams)
  .then(() => {
    console.info('Connected to the DB')
  })
  .catch((e) => {
    console.log(`Error db here: ${e}`)
  })

// Middle ware
app.use(bodyParser.json())

router.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`)
  next()
})

router.get('/notes', (req, res) => {
  console.log('note router')
  const notes = NoteSchema.find({}, function(err, docs) {
    console.log(docs)
    console.log(typeof docs)
    console.log(docs)
    docs.forEach(item => {
      console.log('here')
      console.log(item)
    })
  })
  res.send('<h1>Note page</h1>')
})

router.get('/', (req, res) => {
  console.log('home router')
  res.send('<h1>Home page</h1>')
})

router.get('/hello', (req, res) => {
  console.log('hello router')
  res.send('<h1>Hello router</h1>')
})

router.get('/hello', (req, res) => {
  console.log('hello router')
  res.send('<h1>Hello router</h1>')
})

router.post('/save', (req, res) => {
  console.log('save router')
  const title = req.body.title
  const body = req.body.body
  const createdAt = Date.now()

  const note = {
    title, body,
    created_at: createdAt,
  }

  console.log('note')
  console.log(note)

  const newNote = new NoteSchema({
    title: title,
    body: body,
    created_at: createdAt,
  })

  newNote.save(function(err, data) {
    if (err) {
      console.log(`Error when saving the data: ${err}`)
    } else {
      console.log('Data inserted')
    }
  })

  res.send('Save router')
})

app.use(router)

app.listen(port, () => {
  console.log(`Server is listennig on the port: ${port}`)
})
