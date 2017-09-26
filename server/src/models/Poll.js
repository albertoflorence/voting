module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    title: DataTypes.STRING
  })

  Poll.associate = function (models) {
    Poll.belongsTo(models.User)
    Poll.hasMany(models.Option, {as: 'options'})
  }
  return Poll
}