const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        username: { 
            type: DataTypes.STRING,
            unique:true,
            allowNull: false,
            validate:{
                len:[3, 20],
                isAlphaisAlphanumeric:true,
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
                    if(!regExp.test(value))throw new Error("The password must contain:\r8-15 characters\rOne or multiple numbers and a special characters (@, $, !, %, *, ?, &)\rAt least a capital letter");
                }
            }
        },

        playLists:{
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
