const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('actor', {
    id:{
      type: DataTypes.UUID,
        allowNull: false, 
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    apiID: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }},{
        timestamps:false
    }
  );
};