const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,32}$')
      )
    }
    const {error} = Joi.validate(req.body, schema)
    if(error) {
      switch(error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: `
              You must provide a valid email address
            `
          })
          break
        case 'password':
          res.status(400).send({
            error: `
              <p>The password failed to match the following rules:</p>
              <p>1. It must contain at least one of the following characters: lower case, upper case and numerics.</p>
              <p>2. It must be at least 6 characters in length and not greater then 32 characters in length.</p>
            ` 
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}