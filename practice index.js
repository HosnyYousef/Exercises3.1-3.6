const express = require('express') 
// Purpose: loads the Express library
// 'require': pulls in code or functions from another file or package
// 'express': the Express library we’re importing
// 'const express': stores the Express library we accessed inside a variable so we can run it
const app = express() 
// Purpose: create a web server by running Express to set up routes, middleware, etc... (Handling errors, Connecting to a database, Serving static files (like images or CSS))
// What's a web server: a program that listens for requests and sends back response
// 'express()': runs Express to create a web server
// 'const app': We give instructions to the app to tell it how to behave when someone makes a request
const morgan = require('morgan')
// Purpose: Morgan logs details about each request (like the method, URL, and response time) to the console. e.g. 'GET /home 200 12ms'
// require: pulls in the morgan logging library
// 'const morgan': stores it in a variable so we can use it in our app

app.use(express.json())
// Purpose: We parce json using express (that's within app). making that data available in the req.body
  // tell the app to use this middleware for all incoming requests
// '.use': is pulling middleware from the express library to use instead of manually inputing our own long and tedious middleware. It's like pulling tools from a library to use rather than typing them out
// 'express': we are using code(middleware) from the express library to handle JSON automatically
// 'json()': we retrieve the response as JSON using the json() function of the Response object.

let persons = [
    // Purpose: store a list of people (objects) inside an array called 'persons'
  {
    // name of positions: 'key' : 'value'. together they are called the 'property'
    "id": "1", // - "id" is the person's unique ID
    "name": "Arto Hellas", // - "name" is the person's name
    "number": "040-123456" // - "number" is the person's phone number
  },
      // // Purpose: represent one person's contact information inside the phonebook
          // Each object stores an id, name, and phone number for one person

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
// Purpose: create a custom Morgan token called 'type' that shows the request body (as JSON text) in the logs
  //If someone sends { "name": "John" }, Morgan will log that data in the console!

// Purpose: create a custom Morgan token called 'type' that logs the request body as a JSON string
// 'morgan.token': define a new custom token for Morgan logging
// 'type': the name of the custom token
// 'function (req, res)': a function that takes the request and response objects
// 'req': the incoming request (we will read its body)
// 'res': the outgoing response (not used here, but available)
// 'JSON.stringify(req.body)': convert the request body (which is an object) into a JSON string for logging
// 'return': give back the JSON string so Morgan can use it in the logs


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
// PURPOSE: checks if The name already exists in the phonebook
// 'app': our Express application (the brain we gave instructions to)
// '.post': sets up a rule to handle POST requests (sending data to server). .post is the instruction to the brain. "When someone sends data, do this!"
// '/api/persons/:name': the URL pattern; ':name' means "catch the name from the URL"
// 'request': holds information coming from the user (what they sent)
// 'response': lets us send information back to the user
// 'const names': creating a variable to store the captured name from URL
// 'request.params.name': gets the value of ':name' from the URL (example: if URL is /api/persons/John, this gets "John")
// 'request.params': an object containing all parameters (like 'name') from the URL
// '.name': accessing the "name" property inside request.params
// '.params' It catches anything written in place of :name (or :id, etc.)
// 'persons': the array holding all people in the phonebook
// 'persons.name === name': (wrong) — persons is an array. It should check each person's name inside the array
// 'response.status': set the HTTP status code of the reply
// '(400)': means "Bad Request" — something wrong with the request (here, name already exists)
// '.json': send the response back in JSON format
// 'error:': the error message we send if the name is already taken

persons.forEach(function (name) {
  if (persons.name == !name || persons.number == "") {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }
})
// Purpose: checks if The name or number is missing

app.get('/api/info', (request, response) => {
  const currentDate = new Date()
  response.send(`<h2> Phonebook has info for ${persons.length} people</h2>
  <h2>${currentDate}</h2>`)
})
// Purpose: 
// 'get':
// '/api/info':
// '/api':
// '/info':
// request:
// response:
// 'const currentDate = new Date()':
// 'new Date()'
// 'response.send'



app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = persons.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

// Purpose: handle a GET request to show how many people are in the phonebook and the current date
// 'get': an instruction to the app (brain) to handle GET (fetch) requests
// '/api/info': the URL path; when someone visits this path, this function will run
// '/api': the base part of the path (common for API routes)
// '/info': the specific part asking for phonebook information
// 'request': the incoming request (not used much here, but always available)
// 'response': what we send back to the user
// 'const currentDate = new Date()': creates a variable that stores the current date and time
// 'new Date()': JavaScript command that gives you the current date and time
// 'response.send': sends an HTML response back to the browser or user



app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Purpose: handle a GET request to return all people in the phonebook
// 'get': an instruction to the app (brain) to handle GET (fetch) requests
// '/api/persons': the URL path; when someone visits this path, this function will run
// 'request': the incoming request (not used much here, but always available)
// 'response': what we send back to the user
// 'response.json(persons)': sends the entire 'persons' array as a JSON response to the user


app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})
// Purpose: handle a DELETE request to remove a person from the phonebook by ID
// 'delete': an instruction to the app (brain) to handle DELETE requests
// '/api/persons/:id': the URL path; ':id' means capture the ID from the URL
// 'request': the incoming request (used here to get the ID)
// 'response': what we send back to the user
// 'const id = request.params.id': store the captured ID from the URL into a variable
// 'request.params.id': get the ID value from the URL parameters
// 'persons = persons.filter(note => note.id !== id)': update 'persons' by keeping only the people whose ID is NOT equal to the deleted ID
// '.filter()': creates a new array that passes a condition (keeps certain items)
// 'note => note.id !== id': for each person, check if their ID does NOT match the one we want to delete
// 'response.status(204)': send back HTTP status 204 (No Content) to show success with no data
// '.end()': finish the response without sending any data


app.post('/api/persons', morgan(':method :url :status :res[content-length] - :response-time ms :type'), (request, response) => {

  let note = request.body

  console.log(note)
  console.log(request.headers)

// Purpose: handle a POST request to add a new person to the phonebook and log request info
// 'post': an instruction to the app (brain) to handle POST (send data) requests
// '/api/persons': the URL path where we add new persons
// 'morgan(':method :url :status :res[content-length] - :response-time ms :type')': middleware to log request method, URL, status, response size, response time, and request body
// 'request': the incoming request (contains the data sent by the user)
// 'response': what we send back to the user
// 'let note = request.body': store the JSON body (sent by the user) into a variable called 'note'
// 'request.body': holds the data the user sent in JSON format
// 'console.log(note)': print the received data (note) to the console for debugging
// 'console.log(request.headers)': print the request headers (like content-type) to the console for debugging


  if (!note || Object.keys(note).length === 0) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

// Purpose: check if the incoming data (note) is missing or empty, and return an error if so
// 'if': starts a condition to check something
// '!note': checks if no data was sent (note is undefined or null)
// 'Object.keys(note).length === 0': checks if the object exists but has no properties (empty object)
// 'return': immediately stop and send a response back to the user
// 'response': object used to send a reply back to the user
// '.status(400)': set the HTTP response code to 400 (Bad Request)
// '.json({})': send a response in JSON format
// 'error:': the key for the error message inside the JSON object
// 'content missing': the error message telling the user that no content was sent


  if (!note.name || !note.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }
  
// Purpose: check if the name or number is missing from the incoming data, and return an error if so
// 'if': starts a condition to check something
// '!note.name': checks if the name is missing (empty or undefined)
// '||': means "OR"; the condition is true if either side is true
// '!note.number': checks if the number is missing (empty or undefined)
// 'return': immediately stop and send a response back to the user
// 'response': object used to send the reply
// '.status(400)': set the HTTP status code to 400 (Bad Request)
// '.json({})': send the response back in JSON format
// 'error:': the key for the error message inside the JSON object
// 'name or number is missing': the error message telling the user that either the name or the number was not sent

  // check if name already exists in the phonebook
  if (persons.find(p => p.name === note.name)) {    // note: does not cater for case-sensitivity, so need to add that
    return response.status(400).json({
      error: 'name must be unique'
    })

  }
// Purpose: check if the name already exists in the phonebook when adding a new person
// 'if': starts a condition to check something
// 'persons': the array holding all the people (objects)
// '.find()': searches the array to find the first match
// 'p => p.name === note.name': function to compare each person's name to the new name
// 'p': one person (one object) from the persons array during the search
// 'p.name': the name property of the current person
// 'note.name': the new name coming from the user (request body)
// '===': checks if both names are exactly the same (case-sensitive)
// 'return': immediately send a response and stop running more code
// 'response': object used to send a reply back to the user
// '.status(400)': set the HTTP response code to 400 (Bad Request)
// '.json({})': send the response back in JSON format
// 'error:': the key for the error message inside the JSON object
// 'name must be unique': the message telling the user the name already exists

  const newId = Math.floor(Math.random() * 10000)
  note = { ...note, id: newId.toString() }

  persons.push(note)

  response.json(note)

})

// Purpose: create a new ID for the new person, add the person to the list, and send back the saved data
// 'const newId = Math.floor(Math.random() * 10000)': create a new random ID by generating a random number between 0 and 9999 and rounding it down
// 'Math.random()': generates a random decimal number between 0 and 1
// '* 10000': stretches the random number to a range between 0 and 9999
// 'Math.floor()': rounds the random number down to the nearest whole number
// 'note = { ...note, id: newId.toString() }': create a new object that copies all data from 'note' and adds a new 'id' property
// '...note': spread operator; copies all existing properties (name, number) from the note
// 'id: newId.toString()': add an 'id' property with the new random ID, converted to a string
// 'persons.push(note)': add the new person to the 'persons' array
// 'response.json(note)': send the newly created person back to the user in JSON format

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.floor(Math.random(Math.max(...persons.map(n => Number(n.id)))) * 30) + 1
    : 0
  return String(maxId + 1)
}
// Purpose: create a function to generate a new unique ID for a person
// 'const generateId': create a constant function called generateId
// '() => { }': arrow function syntax; defines a function
// 'persons.length > 0': check if there are any persons already in the list
// '?': if there are persons, do the first thing (before the colon ':')
// ':': if there are no persons, do the second thing (after the colon ':')
// 'persons.map(n => Number(n.id))': create a new array of all IDs converted to numbers
// '...persons.map(...)': spread the IDs into individual values
// 'Math.max(...)': find the highest existing ID
// 'Math.random(Math.max(...))': ⚡ (this is actually a mistake) — Math.random() does NOT take arguments
// 'Math.random()': generate a random decimal between 0 and 1
// '* 30': multiply the random number by 30 to stretch it between 0 and 30
// 'Math.floor(...)': round the number down to the nearest whole number
// '+ 1': make sure ID starts from 1 instead of 0
// 'return String(maxId + 1)': convert the new ID number into a string and return it

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Purpose: start the server and make it listen for incoming requests
// 'const PORT = 3001': create a constant named PORT and set it to 3001 (the port number where the server will run)
// 'app.listen(PORT, () => { })': tell the app (server) to listen on the specified port and run the function when ready
// 'PORT': the port number the server will use to listen for requests
// '() => { }': arrow function syntax; defines what to do once the server starts
// 'console.log(`Server running on port ${PORT}`)': print a message to the console saying the server is running and showing which port


