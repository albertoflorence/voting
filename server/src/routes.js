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
    isAuthenticated,
    PollsController.index)

  app.post('/votes',
    VotesController.vote)
  app.get('/votes',
    VotesController.index)
  app.get('/votes/count',
    VotesController.count)
}