const { test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { title } = require('process')


const api = supertest(app)

const initialBlogs = [
    {
      "title": "Web development",
      "author": "Blob",
      "url": "ldld",
      "likes": 5,
      "id": "6889b96529e09326809f19b3"
    },
    {
      "title": "Hello World",
      "author": "Barb",
      "url": "foo",
      "likes": 3,
      "id": "68949fdf11abac604dffde5d"
    }
  ]

  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

test('blogs are returned as json', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, 2)
  })

test('a valid blog can be added', async() => {
    const newBlog = {
        title: 'Testing 1..2..3',
        author: 'its me',
        url: 'none',
        likes: 2
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.content)
      
        assert.strictEqual(response.body.length, initialBlogs.length + 1)
      
        assert(contents.includes('async/await simplifies making async calls'))
})

// test(' a specific blog is returned within the blogs', async() => {
//     const response = await api.get('/api/blogs')

// })

after(async() => {
    await mongoose.connection.close()
})


