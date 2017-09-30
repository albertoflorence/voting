module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    name: DataTypes.STRING,
  })
  Option.associate = function (models) {
    Option.belongsTo(models.Poll)
  }
  return Option
}