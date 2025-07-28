require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())

const morgan = require('morgan')

morgan.token('body', (request) => {
  if(request.method === 'POST'){
    return JSON.stringify(request.body)
  }else{
    return''
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  }else if(error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }
  next(error)
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if(person){
    response.json(person)
    }else{
      response.status(404).end()
    }
  })
  .catch(error =>next(error))
})


app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if(!body.name){
        return response.status(400).json({error :'name is missing'})
    }
    if(!body.number){
        return response.status(400).json({error :'number is missing'})
    }
    
    Person.findOne({name: body.name})
      .then(existingPerson =>{
        if(existingPerson){
        return response.status(409).json({ error: 'name must be unique' })
        }

      const person = new Person({name: body.name, number: body.number})      

      person.save()
        .then(savedPerson => {
          response.json(savedPerson)
        })
        .catch((error) => next(error))
    })
    .catch((error) => next(error))
  })

app.put('/api/persons/:id',(request, response, next)=> {
  Person.findById(request.params.id)
  .then(person => {
    if(!person){
      return response.status(404).end()
    }
    
    person.number = request.body.number

    return person.save().then((updatePerson) => {
      response.json(updatePerson)
    })
  })
  .catch((error) => next(error))
})

app.delete('/api/persons/:id',(request, response, next) =>{
    Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch(error => next(error))
    
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

