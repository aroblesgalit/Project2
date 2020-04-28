module.exports = function(sequelize, DataTypes) {
  var Name = sequelize.define("Name", {
    // The name cannot be null, and must be a proper name 
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isName: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });