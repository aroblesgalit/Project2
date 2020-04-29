// Creating our Field model
export default function (sequelize, Datatypes) {
    let Titles = sequelize.define("Titles", {
        titles: {
            type: Datatypes.STRING,
            validate: {
                len: [1]
            }
        }
    });

    Titles.associate = function (models) {
        Titles.belongsTo(models.Resources, {
            foreignKey: {
                allowNull: false
            }
        })
    };

    return Titles;
};

