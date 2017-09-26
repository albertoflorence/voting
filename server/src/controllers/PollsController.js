const {Poll, User, Option} = require('../models')
const Promise = require('bluebird')

module.exports = {
  async index (req, res) {
    try {
      const {userId} = req.query
      const where = userId 
                      ? userId 
                      : null
      const polls = await Poll.findAll({
        where : where,
        include: [
          { 
            model: User
          },
          {
            model: Option,
            as: 'options'
          }
        ]
      })
      res.send(polls)
    } catch (err) {
      res.send({
        error: "an error has occured trying to fetch the poll" + err
      })
    }
  },
  async create (req, res) {
    try {
      const {userId, title, options} = req.body
      console.log(userId)
      const poll = await Poll.create({
        UserId: userId,
        title: title,
        options: options.split(',')
          .map(option => {
            return {  
              name: option,
              voted: 0
            }
         })
      }, {
        include: [{
            model: Option,
            as: 'options' 
          }]
      })

      res.send({
        poll: poll
      })
    } catch (err) {
      res.send({
        error: "an error has occured trying to create the poll" + err
      })
    }
  }
}