const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        username: { 
            type: DataTypes.STRING,
            unique:true,
            allowNull: false,
            validate:{
                len:[1, 20],
            }
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[8,15],
                is: function(value){
                    const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    if(!regExp.test(value))throw new Error("The password must contain: 8-15 characters, one or multiple numbers and special characters (@, $, !, %, *, ?, &), at least a capital letter");
                }
            }
        },
        lists:{
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            validate:{
                isInt:true
            }
        },
        subscribedTo:{
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            validate:{
                isInt:true
            }
        },
        subscribers:{
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            validate:{
                isInt:true
            }
        },
        banned:{
            type:DataTypes.BOOLEAN,
        },
        admin:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false,
    });
};
