const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require("../config/config")

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
   expiresIn: ONE_WEEK
  })  
}

async function check (user) {
  const {email, name} = user
  const isEmailAlreadyUsed = await User.findOne({
    where: {email}
  })

  if (isEmailAlreadyUsed) {
    return {
      error: 'This email account is already in use' 
    }
  }

  const isUserName = await User.findOne({
    where: {name}
  })

  if (isUserName) {
    return {
      error: 'This username is already in use'
    }
  }

}

module.exports = {
  async register (req, res) {
    try {
      const checkUser = await check(req.body)
      if(checkUser) {
        res.status(400).send(checkUser)
      } else {
        const user = await User.create(req.body)
        const userJson = user.toJSON()
        res.status(200).send({
          user: userJson,
          token: jwtSignUser(userJson)
        })
      }
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'The login is incorrect'
        })
      }
      const isPasswordValid = await user.comparePassword(password)
      if(!isPasswordValid) {
        return res.status(403).send({
          error: 'The password is incorrect'
        })
      }
      const userJson = user.toJSON()
      res.status(200).send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in' + err
      })
    }
  }
}