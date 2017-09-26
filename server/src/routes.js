const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationPolicy = require('./policies/AuthenticationPolicy')
const PollsController = require('./controllers/PollsController')
module.exports = (app) => {
  app.post('/register',
    AuthenticationPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.post('/polls/create',
    PollsController.create)
  app.get('/polls',
    PollsController.index)
}