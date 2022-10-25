const {DataTypes} = require ('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('movies',
        {
            id:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false
            },
            description:{
                type:DataTypes.TEXT,
                allowNull: false
            },
            image:{
                type: DataTypes.STRING,
                allowNull: false
            },
            lenguage:{
                type: DataTypes.STRING,
            },
            realesedDate:{
                type: DataTypes.STRING
            },

            length:{
                type: DataTypes.INTEGER
            },
            rating:{
                type: DataTypes.FLOAT
            },
            trailer:{
                type: DataTypes.STRING
            },
            saves:{
                type: DataTypes.INTEGER
            }

        })
};