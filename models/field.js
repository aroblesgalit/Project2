// Creating our Field model
module.exports = function (sequelize, Datatypes) {
    var Fields = sequelize.define("Fields", {
        fields: {
            type: Datatypes.STRING,
            validate: {
                len: [1]
            }
        }
    });
    Fields.associate = function (models) {
        Fields.belongsTo(models.Resources, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Fields;
};

