const {Poll, User, Option} = require('../models')
const Promise = require('bluebird')
const VotesController = require('./VotesController')

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
            model: User,
            attributes: ['email']
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
        error: "an error has occured trying to fetch the poll"
      })
    }
  },
  async create (req, res) {
    try {
      const {userId, title, options} = req.body
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