const {Poll, Option, Vote, sequelize, User} = require('../models')
const Promise = require('bluebird')

async function countOne (pollId) {
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

  return {
    countPoll, 
    countOptions
  }
}

module.exports = {
  async vote (req, res) {
    try {
      const {optionId} = req.body
      const option = await Option.findById(optionId)
      const userId = req.user.id

      if(!option) {
        req.status(400).send({
          error: 'This poll doesn\'t exist'
        })
      }

      const vote = await Vote.findOne({
        where: {
          PollId: option.PollId,
          user: userId
        }
      }).then(async (item) => {
        if (item) {
          return await item.update({
            OptionId: optionId
          })
        } else {
          return await Vote.create({
            user: userId,
            PollId: option.PollId,
            OptionId: optionId
          })
        }
      })

      res.send(vote)
    } catch (err) {
      res.send({
        error: "an error has occured trying to vote" + err
      })
    }
  },

  async index (req, res) {
    try {
      const {pollId} = req.query
      const userId = req.user.id
      const vote = await Vote.findOne({
        where: {
          user: userId,
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
      if (!Array.isArray(pollId)) {
        const count = await countOne(pollId)
        return res.send(count)
      } else {
        const counts = await Promise.all(pollId.map(async id => {
          return {
            [id]: (await countOne(id)).countPoll
          }
        }))
        const agoravai = counts.reduce((obj, item) => {
          obj[Object.keys(item)[0]] = item[Object.keys(item)[0]]
          return obj
        }, {})
        return res.send(agoravai)
      }
    } catch (ex) {
      error: "an error has occured trying to count the votes"
    }
  }
}


a = [
  {
    1: 'value'
  },
  {
    2: 'value'
  }
]