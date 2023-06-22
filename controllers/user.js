// import User model/schema.
const User = require("../models/User");

//login user
const login = async (req, res) => {
  res.json({ mssg: "login user" });
};

//signup user

const signup = async (req, res) => {

  const { email, password } = req.body
  try {
    const user = await User.signup(email, password);
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// export login/signup user functions
module.exports = {  login,  signup };


// const User = require('../models/User')

// // login a user
// const login  = async (req, res) => {
//   res.json({mssg: 'login user'})
// }

// // signup a user
// const signup = async (req, res) => {
//   const {email, password} = req.body

//   try {
//     const user = await User.signup(email, password)

//     res.status(200).json({email, user})
//   } catch (error) {
//     res.status(400).json({error: error.message})
//   }
// }

// module.exports = { signup, login}
