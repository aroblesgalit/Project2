module.exports = function(sequelize, Datatypes) {
  //creates the resources table"s columns
  var Resources = sequelize.define("Resources", {
    fields: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 160]
      }
    },
    title: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 160]
      }
    },
    //changed this to be a .text type, maximum characters 500
    description: {
      type: Datatypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    link: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 160]
      }
    },
    imageUrl: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 160]
      }
    }
  });
  //makes the resources belong to a specific field.
  //Prevents a resource from being created without a field I.D.
  // Resources.associate = function(models) {
  //   Resources.belongsTo(models.Fields, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Resources;
};
