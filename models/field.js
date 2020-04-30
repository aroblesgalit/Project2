// Creating our Titles model
module.exports = function(sequelize, Datatypes) {
  let Fields = sequelize.define("Fields", {
    titles: {
      type: Datatypes.STRING,
      validate: {
        len: [1]
      }
    }
  });

  // Associate table with Resources table
  Fields.associate = function(models) {
    Fields.hasMany(models.Resources, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Fields;
};
