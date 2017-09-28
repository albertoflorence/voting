const {Poll, Option, Vote, sequelize, User} = require('../models')
const Promise = require('bluebird')

module.exports = {
  async vote (req, res) {
    try {
      const {optionId} = req.body
      const option = await Option.findById(optionId)
      const user = 'nigga'

      const vote = await Vote.findOne({
        where: {
          PollId: option.PollId,
          user: user
        }
      })
      if(vote) {
        vote.update({
          OptionId: optionId
        })
        res.send(vote)
      } else {
        const newVote = await Vote.create({
          PollId: option.PollId,
          OptionId: option.id,
          user: user
        })
        res.send(newVote)
      }
    } catch (err) {
      res.send({
        error: "an error has occured trying to vote"
      })
    }
  },

  async index (req, res) {
    try {
      const {pollId} = req.query
      const vote = await Vote.findOne({
        where: {
          user: 'alberto',
          PollId: pollId
        }
      })
      res.send(vote)
    } catch (err) {
      res.send({
        error: "an error has occured trying to fetch the votes"
      })
    }
  },

  async count (req, res) {
    try {
      const {pollId} = req.query
      const polls = await Vote.findAll({
      where: {
        PollId: pollId
        }
      })

      const countPoll = polls.length

      const countOptions = polls.reduce((obj, poll) => {
        const item = poll.OptionId
        if (obj.hasOwnProperty(item)) {
          obj[item] += 1
        } else {
          obj[item] = 1
        }
        return obj
      }, {})
    
      res.send({
        countPoll, 
        countOptions
      })
    } catch (ex) {
      error: "an error has occured trying to count the votes"
    }
  }
}