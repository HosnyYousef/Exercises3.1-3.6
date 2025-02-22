const express = require('express')
const app = express()

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

app.get('/api/info', (request, response) => {
  const currentDate = new Date()
  response.send(`<h2> Phonebook has info for ${persons.length} people</h2>
  <h2>${currentDate}</h2>`)
})

// app.get('/api/info', (request, response) => {
//   response.send(`<h1>phonebook has info for 2 people</h1> <p> current date </p>`)
// })

// phonebook has info for 2 people
// current date

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



app.post('/api/persons', (request, response) => {
  const note = request.body
  console.log(note)
  response.json(note)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const newId = Math.floor(Math.random() * 10000)

  const note = request.body

  note.id = String(newId)

  persons = persons.concat(note)

  response.json(note)
})

app.post('/api/persons', (request, response) => { // transforms it into a JavaScript object 
  const note = request.body // and then attaches it to the body property of the request
  console.log(note) // application does not do anything with the received data besides printing it to the console and sending it back in the response
  response.json(note) // 
})

app.post('/api/persons', (request, response) => {
  const newId = Math.floor(Math.random() * 10000)

  const note = request.body

  note.id = String(newId)

  persons = persons.concat(note)

  response.json(note)
})

//=======

// "id": "5",
// "name": "Delete Test",
// "number": "604-any-time"

// Math.floor(Math.random() * 30) + 1

//=======

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.floor(Math.random(Math.max(...persons.map(n => Number(n.id)))) * 30) + 1
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  persons = persons.concat(note)

  response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})