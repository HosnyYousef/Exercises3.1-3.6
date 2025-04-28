const express = require('express') 
// purpose: for us access the express library to run it
// 'const express': constant, meaning we can't reassign variable, as aposed to 'let', which allows as to reassign variables. We're this variable express
// 'require': a function that loads in a nother file or package
// 'require('express')': loads express library for us to build servers and access middlewars
// 'const express = require('express')': we're placing access to the express library into a varable to run it later
// What's a server? Server = request in, response out
const app = express() 
// purpose: so we can run express, and place it in a variable
// 'const app': express() is just started in variable app until it's used
// 'express()':  running express, w the servers and middleware when we need them
// What does routing mean?: telling the server what to do when someone visits a specific URL e.g. app.get('/', (req, res) => {...}

// purpose: to run express and store it in a variable so we can build our server
// 'const app': constant variable that holds our express app
// 'express()': runs express; sets up the server and gives access to routing, middleware, etc.
// 'express()': calls (runs) the express function to create an app we can control


const morgan = require('morgan') 
// purpose: 
// 'const': 
// 'morgan': 
// 'require': 
// 'require('morgan')': 
// 'const morgan = require('morgan')': 


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
// purpose: 
// 'morgan.token': 
// 'type': 
// 'function (req, res)': 
// 'req': 
// 'res': 
  return `${JSON.stringify(req.body)}`
// purpose: 
// 'return': 
// 'JSON.stringify(req.body)': 
})

// The name already exists in the phonebook
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

// The name or number is missing
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

  // check if name already exists in the phonebook
  if (persons.find(p => p.name === note.name)) {    // note: does not cater for case-sensitivity, so need to add that
    return response.status(400).json({
      error: 'name must be unique'
    })

  }

  const newId = Math.floor(Math.random() * 10000)
  note = { ...note, id: newId.toString() }

  persons.push(note)

  response.json(note)

})

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

