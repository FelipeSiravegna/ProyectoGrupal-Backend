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
            apiID:{
                type: DataTypes.INTEGER,
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
            language:{
                type: DataTypes.STRING,
            },
            releaseDate:{
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