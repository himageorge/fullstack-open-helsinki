const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blogs = await Blog.findById(request.params.id)
  if(blogs){
      response.json(blog)
  }else{
      response.status(404).end()
  }
})

blogsRouter.post('/', async(request, response, next) => {
  const body = request.body

  try{
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

  }catch(error){
    next(error)
    }
})

blogsRouter.delete('/:id', async(request, response, next) => {
  try{
  const blogs = await Blog.findByIdAndDelete(request.params.id)
    if(blogs){
      response.status(204).end()
    }
  }catch(error) {
    next(error)
  } 
})

    
blogsRouter.put('/:id', async(request, response, next) => {
  const body = request.body
  console.log('Request body:', body)
  try{
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {new: true})
  if (updatedBlog) {
    // Send a successful response with the updated document.
    response.status(200).json(updatedBlog);
  } else {
    // Send a 404 Not Found error if the blog doesn't exist.
    response.status(404).json({ error: 'Blog not found' });
  }
  }catch (error) {
    next(error)
 }
})

module.exports = blogsRouter