const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { User, contacts, newContact } = require('../model/__mocks__/data')
require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: User.id }, JWT_SECRET_KEY)
User.token = token

jest.mock('../model/contacts.js')
jest.mock('../model/users.js')

describe('Testing the route api/contacts', () => {
  let idNewContact = null
  //get
  describe('should handle GET request', () => {
        test('should return 200 status for GET: /contacts', async (done) => {
            const res = await request(app)
                .get('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contacts.contacts).toBeInstanceOf(Array)
            done()
        })
     test('should return 200 status for GET: /contacts/:contactId', async (done) => {
       const contact = contacts[0]
       const res = await request(app)
      .get(`/api/contacts/${contact._id}`)
      .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.contact._id).toBe(contact._id)
      done()
     })
    //  test('should return 404 status for GET: /contacts/:contactId', async (done) => {
    //           const res = await request(app)
    //             .get('/api/contacts/6089dd20cfff152dc0f9a12t')
    //             .set('Authorization', `Bearer ${token}`)
    //             console.log('res.body', res.body)
    //         expect(res.status).toEqual(404)
    //         expect(res.body).toBeDefined()
    //         done()
    //      })
    
      test('should return 400 status for GET: /contacts/:contactId', async (done) => {
      const res = await request(app)
        .get(`/api/contacts/6089dd20cfff150f9a120`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })
  })
    //post
   describe('should handle POST request', () => {
    test('should return 201 status for POST: /contacts', async (done) => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send(newContact)
      expect(res.status).toEqual(201)
      expect(res.body).toBeDefined()
      idNewContact = res.body.data.contact._id
      done()
    })
      test('should return 400 status for POST: /contacts wrong field', async (done) => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({...newContact, test: 1})
      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })
        test('should return 400 status for POST: /contacts without field', async (done) => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({email: "t@t.com"})
      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })
   })
  //put
    describe('should handle PUT request', () => {
    test('should return 200 status for PUT: /contacts/:contactId', async (done) => {
      const res = await request(app)
        .put(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ name: 'Loopy Loo' })
      // console.log('res.body', res.body)
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.contact.name).toBe('Loopy Loo')
      done()
    })
      test('should return 400 status for PUT: /contacts/:contactId wrong field', async (done) => {
      const res = await request(app)
        .put('/api/contacts/1234')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({test: 1})
      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })
    //     test('should return 404 status for PUT: /contacts/:contactId without field', async (done) => {
    //   const res = await request(app)
    //     .put('/api/contacts/6089dd20cfff152dc0f9a12d')
    //     .set('Authorization', `Bearer ${token}`)
    //     .set('Accept', 'application/json')
    //         .send({ email: "t@t.com" })
    //       // console.log('res.body', res.body)
    //   expect(res.status).toEqual(404)
    //   expect(res.body).toBeDefined()
    //   done()
    // })
    })
  //patch
    describe('should handle PATCH request', () => {
    test('should return 200 status for PATCH: /contacts/:contactId/favorite', async (done) => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}/favorite`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ favorite: true })
      // console.log('res.body', res.body)
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.contact.favorite).toBe(true)
      done()
    })
      test('should return 400 status for PATCH: /contacts/:contactId wrong field', async (done) => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}/favorite`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({test: 1})
      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })
    //     test('should return 404 status for PATCH: /contacts/:contactId without field', async (done) => {
    //   const res = await request(app)
    //     .patch('/api/contacts/6089dd20cfff152dc0f9a16t/favorite')
    //     .set('Authorization', `Bearer ${token}`)
    //     .set('Accept', 'application/json')
    //         .send({ favorite: true })
    //       console.log('res.body', res.body)
    //   expect(res.status).toEqual(404)
    //   expect(res.body).toBeDefined()
    //   done()
    // })
  })    
})


 
