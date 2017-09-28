module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    user: DataTypes.STRING
  })

  Vote.associate = function (models) {
    Vote.belongsTo(models.Poll)
    Vote.belongsTo(models.Option)
  }
  return Vote
}