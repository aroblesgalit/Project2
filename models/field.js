// Creating our Titles model
export default function (sequelize, Datatypes) {
    let Titles = sequelize.define("Titles", {
        titles: {
            type: Datatypes.STRING,
            validate: {
                len: [1]
            }
        }
    });
    
// Associate table with Resources table
    Titles.associate = function (models) {
        Titles.belongsTo(models.Resources, {
            foreignKey: {
                allowNull: false
            }
        })
    };

    return Titles;
};

