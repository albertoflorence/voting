module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    name: DataTypes.STRING,
    voted: DataTypes.INTEGER
  })
  Option.associate = function (models) {
    Option.belongsTo(models.Poll)
  }
  return Option
}