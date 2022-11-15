const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('list', {
        name: { 
            type: DataTypes.STRING,
            unique:false,
            allowNull: false,
            validate:{
                len:[0,30]
            }
        },
        moviesIdList:{
            type:DataTypes.ARRAY(DataTypes.INTEGER),
            validate:{
                isInt:true
            }
        },
        description:{
            type: DataTypes.STRING,
            validate:{
                len:[0,500]
            }
        },
        ownerUserId:{
            type:DataTypes.INTEGER,
            validate:{
                isInt:true
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
