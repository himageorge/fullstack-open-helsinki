const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blogs = await Blog.findById(request.params.id)
  if(blog){
      response.json(blog)
  }else{
      response.status(404).end()
  }
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  blog.save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// blogsRouter.put('/:id', (request, response, next) => {
//   const { content, important } = request.body

//   Note.findById(request.params.id)
//     .then(note => {
//       if (!note) {
//         return response.status(404).end()
//       }

//       note.content = content
//       note.important = important

//       return note.save().then((updatedNote) => {
//         response.json(updatedNote)
//       })
//     })
//     .catch(error => next(error))
// })

module.exports = blogsRouter