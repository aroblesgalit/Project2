module.exports = function(sequelize, Datatypes){
    var Resources = sequelize.define("Resources", {
        fields: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        title:{
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
        }

    });
    Resources.associate = function(models){
        Resources.belongsTo(models.Fields,{
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Resources;
}