const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async(request, response) => {
    const {username, name, password} = request.body
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user ={
        username,
        name, 
        passwordHash,
    }

    const savePerson = await user.save()
    response.status(201).json()
    module.exports = usersRouter
})