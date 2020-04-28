module.exports = function(sequelize, Datatypes) {
  //creat
  var Resources = sequelize.define("Resources", {
    fields: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    title: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    link: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    imageUrl: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  //makes the resources belong to a specific field.
  //Prevents a resource from being created without a field I.D.
  Resources.associate = function(models) {
    Resources.belongsTo(models.Fields, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Resources;
};
