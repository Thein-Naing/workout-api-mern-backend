const mongoose = require('mongoose');

//import bcrypt.
const bcrypt = require('bcrypt');

// install validator and import .
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }

});

// use static signup method
userSchema.statics.signup = async function(email, password) {
  // we use this instead of User so we must make normal function instead of arrow function.
// userSchema.statics.signup = async function (email, password) {

// validation
if (!email || !password) {
  throw Error('All fill must be filled')
}

if(!validator.isEmail(email)) {
  throw Error('Email is not valid')
}

if(!validator.isStrongPassword(password)) {
  throw Error('Password is not strong enough')
}



// 1st we will check email is already exist.we do not have user at the moment, so we use this.
const exists = await this.findOne({email})
if(exists) {
  throw Error('Email already in use')
}
//2nd bcrypt force us to use salt and so we have to generate salt
const salt = await bcrypt.genSalt(10) // default for salt is 10.

// hashing salt together with password
const hash = await bcrypt.hash(password, salt)

// then create user using above values and store in database.
// in sql it will be look like document.
const user = await this.create({email, password: hash})


// return User
return user

}


module.exports = mongoose.model('User', userSchema)


// const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

// const Schema = mongoose.Schema

// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },

//   password: {
//     type: String,
//     required: true
//   }
// })

// // static signup method
// userSchema.statics.signup = async function(email, password) {

//   const exists = await this.findOne({ email })

//   if (exists) {
//     throw Error('Email already in use')
//   }

//   const salt = await bcrypt.genSalt(10)
//   const hash = await bcrypt.hash(password, salt)

//   const user = await this.create({ email, password: hash })

//   return user
// }

// module.exports = mongoose.model('User', userSchema)
