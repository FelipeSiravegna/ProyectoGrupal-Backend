const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('director', {
      id:{
        type: DataTypes.UUID,
        allowNull: false, 
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      banned:{
        type:DataTypes.BOOLEAN,
    }
    },{
        timestamps:false
    },
  );
};