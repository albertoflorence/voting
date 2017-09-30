const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationPolicy = require('./policies/AuthenticationPolicy')
const PollsController = require('./controllers/PollsController')
const VotesController = require('./controllers/VotesController')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  app.post('/register',
    AuthenticationPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.post('/polls/create',
    isAuthenticated,
    PollsController.create)
  app.get('/polls',
    PollsController.index)
  app.get('/polls/:pollId',
    isAuthenticated,
    PollsController.show)
  app.get('/polls/user/0',
    isAuthenticated,
    PollsController.index)
  app.delete('/polls/:pollId',
    isAuthenticated,
    PollsController.delete)
  app.put('/polls/:pollId/add-option',
    PollsController.addOption)

  app.post('/votes',
    isAuthenticated,
    VotesController.vote)
  app.get('/votes',
    isAuthenticated,
    VotesController.index)
  app.get('/votes/count',
    VotesController.count)
}