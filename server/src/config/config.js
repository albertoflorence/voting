const path = require('path')

module.exports = {
  port: process.env.PORT || 5000,
  db: {
    database: process.env.DB_NAME || 'voting',
    user: process.env.DB_USER || 'voting',
    password: process.env.DB_PASS || 'voting',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../voting.sqlite') 
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}