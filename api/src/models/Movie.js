const {DataTypes} = require ('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('movie',
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
            popularity: {
                type: DataTypes.FLOAT
            },
            saves:{
                type: DataTypes.INTEGER
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            banned:{
                type:DataTypes.BOOLEAN,
            }
        },
        {
            timestamps: false
        })
};