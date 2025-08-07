const { test, after } = require('node: test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test.only('blogs are returned as json', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('a valid blog can be added', async() => {
    await api
        .post('/api/blogs/')
        .expect(201)
        .expect('Content-Type', /application\/json/)
})

const response = await api.get('/api/blogs')


after(async() => {
    await mongoose.connection.close()
})

// const contents = response.body.map(r => r.content)

// assert.strictEqual(response.body.length, initialBlogs.length + 1)

// assert(contents.includes('async/await simplifies making async calls'))

// test('all blogs are returned', async () => {
//   const response = await api.get('/api/blogs')

//   assert.strictEqual(response.body.length, 2)
// })

// test('a specific blog is within the returned blogs', async () => {
//   const response = await api.get('/api/blogs')

//   const contents = response.body.map(e => e.content)
//   assert.strictEqual(contents.includes('HTML is easy'), true)
// })
