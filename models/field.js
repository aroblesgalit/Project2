// Creating our Titles model
module.exports = function(sequelize, Datatypes) {
  let Field = sequelize.define("Field", {
    title: {
      type: Datatypes.STRING,
      validate: {
        len: [1]
      }
    }
  });

  // Associate table with Resources table
  Field.associate = function(models) {
    Field.hasMany(models.Resource, {
      foreignKey: {
        allowNull: false
      }
    });
    Field.hasMany(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Field;
};
