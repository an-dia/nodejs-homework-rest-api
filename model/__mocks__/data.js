const contacts = [
  {
    _id: "6089dd20cfff152dc0f9a12a",
    name: "Chaim Lewis",
    email: "dui.in@egetlacus.ca",
    phone: "(294) 840-6685",
    favorite: true
  },
  {
    _id: "6089dd20cfff152dc0f9a131",
    name: "Thomas Lucas",
    email: "nec@Nulla.com",
    phone: "(704) 398-7993",
    favorite: false
},
]

const newContact = {
  name: "New Test",
  email: "new@test.com",
  phone: "(000) 000-0000",
  favorite: false
}

const User = {
    _id: '60a6b06eb369d9237496d06a',
    id: '60a6b06eb369d9237496d06a',
    subscription: 'pro',
    name: 'Ana Dia',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTZiMDZlYjM2OWQ5MjM3NDk2ZDA2YSIsImlhdCI6MTYyMTYzMjE5OCwiZXhwIjoxNjIxNjM5Mzk4fQ.GAmR4b-FyzkwPlPk6zKbiT0z4YhpnQ4GLhdCfYp72QE',
    email: 'gelja4ka@gmail.com',
    password: '$2a$06$iIjypwbIOqq7B6xwCs58rOuttdElMb9XFOI8cOFHU7XdYa9h6zlai',
    avatarURL: 'https://s.gravatar.com/avatar/d36f4aa645b98dcf3d8a6aca4c7d8b02?s=250',
    createdAt: '2021-05-20T18:54:38.050Z',
    updatedAt: '2021-05-21T22:41:43.302Z',
    idCloudAvatar: null,
}

const users = []
users[0] = User

const newUser = { email: 'test@test.com', password: '123456' }

module.exports = { contacts, newContact, User, users, newUser }