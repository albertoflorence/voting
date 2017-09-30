const {Poll, User, Option, Vote, sequelize} = require('../models')

function check (poll) {
  const {title, options} = poll

  if(!title) {
    return {
      error: 'The title shouldn\'t be empty'
    }
  }
  const noEmptyOptions = options.filter(item => item.name)
  if(noEmptyOptions.length < 2) {
    return {
      error: 'You need at least 2 options to create a poll'
    }
  }
  return {
    title,
    options: noEmptyOptions
  }
}

async function randomPoll (userId) {
  const pollsVoted = await Vote.findAll({
    where: {
      user: userId
    }
  })
  const randomPolls = await Poll.findAll({
    include: [
      { 
        model: User,
        attributes: ['name']
      },
      {
        model: Option,
        as: 'options'
      }
    ]
  })

  const pollsNotVoted = randomPolls.reduce((arr, poll) => {
    const isVoted = pollsVoted.some(vote => vote.PollId === poll.id)
    if (!isVoted)  {
      arr.push(poll)
    }
    return arr
  }, [])

  const max = pollsNotVoted.length
  const randomIndex = parseInt(Math.random() * max)
  return pollsNotVoted[randomIndex]
}

module.exports = {
  async index (req, res) {
    try {
      const {by} = req.query
      let where = null
      if(by)  { 
        where = {
          UserId: req.user.id
        }
      }

      const polls = await Poll.findAll({
        where: where,
        include: [
          { 
            model: User,
            attributes: ['name']
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
  async show (req, res) {
    try {
      const {pollId} = req.params
      const userId = req.user.id
      if (pollId === 'random') {
        const poll = await randomPoll(userId)
        return res.send(poll)
      }
      const poll = await Poll.findById(pollId,{
        include: [
          { 
            model: User,
            attributes: ['name']
          },
          {
            model: Option,
            as: 'options'
          }
        ]
      })
      res.send(poll)
    } catch (err) {
      res.send({
        error: "an error has occured trying to fetch the poll" + err
      })
    }
  },
  async create (req, res) {
    try {
      const {title, options, error} = check(req.body)
      const userId = req.user.id
      if(error) {
        return res.send({error})
      }

      const poll = await Poll.create({
        UserId: userId,
        title: title,
        options: options
          .filter(option => option.name)
          .map(option => {
            return {  
              name: option.name
            }
         })
      }, {
        include: [{
            model: Option,
            as: 'options' 
          }]
      })

      res.send({poll})
    } catch (err) {
      res.send({
        error: "an error has occured trying to create the poll" + err
      })
    }
  },
  async addOption(req, res) {
    const {pollId} = req.params
    const {optionName} = req.body
    try {
      const option = await Option.create({
        PollId: pollId,
        name: optionName
      })
      const poll = await Poll.findById(pollId,{
        include: [
          { 
            model: User,
            attributes: ['name']
          },
          {
            model: Option,
            as: 'options'
          }
        ]
      })
      res.send(poll)

    } catch (err) {
      res.send({
        error: "an error has occured trying to add the new option"
      })
    }
  },
  async delete (req, res) {
    const {pollId} = req.params
    const userId = req.user.id
    try {
      const poll = await Poll.findOne({
        where: {
          id: pollId,
          UserId: userId
        }
      })
      if(!poll) {
        return res.status(403).send({
          error: 'you do not have access to this polll'
        })
      }
      await poll.destroy()
      res.send(poll)
    } catch (err) {
      res.send({
        error: "an error has occured trying to delete the poll"
      })
    }
  }
}