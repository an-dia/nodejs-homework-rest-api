const mongoose = require('mongoose') 
const { Schema, model } = mongoose
const gravatar = require('gravatar')
const {Subscription} = require('../../helper/constants')
const bcrypt = require('bcryptjs')
const SALT_FACTOR = 6

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate(value) {
      const re = /\S+@\S+\.\S+/
      return re.test(String(value).toLowerCase())
    }
  },
  subscription: {
    type: String,
    enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
    default: Subscription.STARTER
  },
   name: {
    type: String,
    minlength: 2,
    default: 'Guest'
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, {s: '250'}, true)
    }
  },
  idCloudAvatar: {
    type: String,
    default: null,
  }
  }, {
    versionKey: false,
    timestamps: true,
  }
  )
/* здесь шифруем пароль */ 
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})
/* проверяем валидность пароля */
userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(String(password), this.password)
}
  
const User = model('user', userSchema)

module.exports = User