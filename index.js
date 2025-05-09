const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())


let persons = [

  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  },
  {
    "id": "5",
    "name": "Delete Test",
    "number": "604-any-time"
  }
]

morgan.token('type', function (req, res) {
  return `${JSON.stringify(req.body)}`
})

app.post('/api/persons/:name', (request, response) => {
  const names = request.params.name

  persons.forEach(name => {
    if ((persons.name === name)) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
  })
})

persons.forEach(function (name) {
  if (persons.name == !name || persons.number == "") {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }
})

app.get('/api/info', (request, response) => {
  const currentDate = new Date()
  response.send(`<h2> Phonebook has info for ${persons.length} people</h2>
<h2>${currentDate}</h2>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = persons.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/persons', morgan(':method :url :status :res[content-length] - :response-time ms :type'), (request, response) => {

  let note = request.body

  console.log(note)
  console.log(request.headers)
})

if (!note || Object.keys(note).length === 0) {
  return response.status(400).json({
    error: 'content missing'
  })
}

if (!note.name || !note.number) {
  return response.status(400).json({
    error: 'name or number is missing'
  })
}

if (persons.find(p => p.name === note.name)) {
  return response.status(400).json({
    error: 'name must be unique'
  })
}

const newId = Math.floor(Math.random() * 10000)
note = { ...note, id: newId.toString() }

persons.push(note)
response.json(note)

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.floor(Math.random(Math.max(...persons.map(n => Number(n.id)))) * 30) + 1
    : 0
  return String(maxId + 1)
}

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})