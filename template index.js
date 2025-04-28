const express = require('express') 
// purpose: access the express library so we can load servers and middleware
// 'const' express': 
// 'require': 
// 'require('express')': 
// 'const express = require('express')': 

const app = express() 
// purpose: 
// 'const': 
// 'app': 
// 'express()': 
// 'const app = express()': 

const morgan = require('morgan')
// purpose: 
// 'const': 
// 'morgan': 
// 'require': 
// 'require('morgan')': 
// 'const morgan = require('morgan')': 

app.use(express.json())
// purpose: 
// 'app.use': 
// 'express.json()': 
// 'express': 
// '.json': 
// '.use': 

let persons = [
  // Purpose: 
{
  // name of object positions: 
  "id": "1", 
  "name": "Arto Hellas", 
  "number": "040-123456" 
},
// Purpose: 
// 'id': 
// 'name': 
// 'number': 
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

// For each object:
// purpose:
// 'id': 
// 'name': 
// 'number': 

morgan.token('type', function (req, res) {
return `${JSON.stringify(req.body)}`
})
// purpose: 
// 'morgan.token': 
// 'type': 
// 'function (req, res)': 
// 'req': 
// 'res': 
// 'return': 
// 'JSON.stringify(req.body)': 

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
// purpose: 
// 'app.post': 
// '/api/persons/:name': 
// 'request': 
// 'response': 
// 'const names': 
// 'request.params.name': 
// 'persons.forEach': 
// 'name =>': 
// 'persons.name': 
// 'name': 
// 'response.status(400)': 
// '.json': 
// 'error': 

persons.forEach(function (name) {
if (persons.name == !name || persons.number == "") {
return response.status(400).json({
error: 'name or number is missing'
})
}
})
// purpose: 
// 'persons.forEach': 
// 'function(name)': 
// 'persons.name': 
// 'persons.number': 
// 'response.status(400)': 
// '.json': 
// 'error': 

app.get('/api/info', (request, response) => {
const currentDate = new Date()
response.send(`<h2> Phonebook has info for ${persons.length} people</h2>
<h2>${currentDate}</h2>`)
})
// purpose: 
// 'app.get': 
// '/api/info': 
// 'request': 
// 'response': 
// 'const currentDate': 
// 'new Date()': 
// 'response.send': 

app.get('/api/persons/:id', (request, response) => {
const id = request.params.id
const note = persons.find(note => note.id === id)
if (note) {
response.json(note)
} else {
response.status(404).end()
}
})
// purpose: 
// 'app.get': 
// '/api/persons/:id': 
// 'request': 
// 'response': 
// 'const id': 
// 'request.params.id': 
// 'const note': 
// 'persons.find': 
// 'note => note.id === id': 
// 'response.json(note)': 
// 'response.status(404)': 
// '.end()': 

app.get('/api/persons', (request, response) => {
response.json(persons)
})
// purpose: 
// 'app.get': 
// '/api/persons': 
// 'request': 
// 'response': 
// 'response.json(persons)': 

app.delete('/api/persons/:id', (request, response) => {
const id = request.params.id
persons = persons.filter(note => note.id !== id)

response.status(204).end()
})
// purpose: 
// 'app.delete': 
// '/api/persons/:id': 
// 'request': 
// 'response': 
// 'const id': 
// 'persons.filter': 
// 'note => note.id !== id': 
// 'response.status(204)': 
// '.end()': 

app.post('/api/persons', morgan(':method :url :status :res[content-length] - :response-time ms :type'), (request, response) => {

let note = request.body

console.log(note)
console.log(request.headers)
})
// purpose: 
// 'app.post': 
// 'morgan(...)': 
// '/api/persons': 
// 'request': 
// 'response': 
// 'let note': 
// 'request.body': 
// 'console.log(note)': 
// 'console.log(request.headers)': 

if (!note || Object.keys(note).length === 0) {
return response.status(400).json({
error: 'content missing'
})
}
// purpose: 
// 'if': 
// '!note': 
// 'Object.keys(note).length === 0': 
// 'return': 
// 'response.status(400)': 
// '.json': 
// 'error': 

if (!note.name || !note.number) {
return response.status(400).json({
error: 'name or number is missing'
})
}
// purpose: 
// 'if': 
// '!note.name': 
// '||': 
// '!note.number': 
// 'return': 
// 'response.status(400)': 
// '.json': 
// 'error': 

if (persons.find(p => p.name === note.name)) {
return response.status(400).json({
error: 'name must be unique'
})
}
// purpose: 
// 'if': 
// 'persons.find': 
// 'p => p.name === note.name': 
// 'return': 
// 'response.status(400)': 
// '.json': 
// 'error': 

const newId = Math.floor(Math.random() * 10000)
note = { ...note, id: newId.toString() }

persons.push(note)

response.json(note)
// purpose: 
// 'const newId': 
// 'Math.random()': 
// '* 10000': 
// 'Math.floor()': 
// 'note = { ...note, id: newId.toString() }': 
// '...note': 
// 'id: newId.toString()': 
// 'persons.push(note)': 
// 'response.json(note)': 

const generateId = () => {
const maxId = persons.length > 0
? Math.floor(Math.random(Math.max(...persons.map(n => Number(n.id)))) * 30) + 1
: 0
return String(maxId + 1)
}
// purpose: 
// 'const generateId': 
// '() => { }': 
// 'persons.length > 0': 
// '?': 
// ':': 
// 'persons.map(...)': 
// 'Number(n.id)': 
// 'Math.max(...)': 
// 'Math.random()': 
// '* 30': 
// 'Math.floor()': 
// '+ 1': 
// 'return String(maxId + 1)': 

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
// purpose: 
// 'const PORT = 3001': 
// 'app.listen(PORT, () => { })': 
// 'PORT': 
// '() => { }': 
// 'console.log(...)': 
