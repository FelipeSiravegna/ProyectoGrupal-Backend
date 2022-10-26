const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('list', {
        name: { 
            type: DataTypes.STRING,
            unique:true,
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
        }
    }, {
        timestamps: false,
    });
};
