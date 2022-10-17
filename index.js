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
const port = 3000
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
  const id = req.body.id_note
  const title = req.body.title
  const body = req.body.body
  const createdAt = Date.now()

  const note = {
    id: id,
    title, body,
    created_at: createdAt,
  }

  console.log('note')
  console.log(note)

  const newNote = new NoteSchema({
    id_note: id,
    title: title,
    body: body,
    created_at: createdAt,
  })

  res.send(note)

  // newNote.save(function(err, data) {
  //   if (err) {
  //     console.log(`Error when saving the data: ${err}`)
  //   } else {
  //     res.send('<h1>Data inserted</h1>')
  //   }
  // })
})

app.use(router)

app.listen(port, () => {
  console.log(`Server is listennig on the port: ${port}`)
})
