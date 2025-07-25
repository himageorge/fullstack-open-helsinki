require('dotenv').config()


const Person = require('./models/person')
const express = require('express')
const app = express()
app.use(express.json())

app.use(express.static('dist'))
  
const morgan = require('morgan')

morgan.token('body', (request) => {
  if(request.method === 'POST'){
    return JSON.stringify(request.body)
  }else{
    return''
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})


app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name){
        response.status(400).json({error :'name is missing'})
    }
    if(!body.number){
        response.status(400).json({error :'number is missing'})
    }

    if (persons.find(p => p && p.name === body.name)) {
        return response.status(409).json({ error: 'name must be unique' })
    }
    
    const person = new Person({name: body.name, number: body.number})      

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

app.delete('/api/persons/:id',(request, response) =>{
    Person.findByIdAndDelete(request.params.id).then(result => {
      if(result){
        response.status(204).end()
      }else{
        response.status(404).json({ error: 'person not found' })
      }
      })
    
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
