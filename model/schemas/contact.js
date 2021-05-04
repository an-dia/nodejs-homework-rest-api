  const mongoose = require('mongoose') 
  const { Schema, model } = mongoose

  const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, {
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        // delete ret.name
        return ret
      },
    },
  }
  )
  
contactSchema.path('name').validate((value) => {
  const re = /[A-Z]\w+/
  return re.test(String(value))
  })

// contactSchema.virtual('nick').get(function () {
//   return `${this.name}`
// })
  
const Contact = model('contact', contactSchema)

module.exports = Contact
