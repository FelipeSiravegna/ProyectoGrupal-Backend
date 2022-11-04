const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('list', {
        name: { 
            type: DataTypes.STRING,
            unique:true,
            allowNull: false,
            validate:{
                len:[1,30]
            }
        },
        description:{
            type: DataTypes.STRING,
            validate:{
                len:[0,500]
            }
        },
        banned:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: false,
    });
};
