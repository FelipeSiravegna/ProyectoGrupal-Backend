const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("review",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1, 1000]
        }
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      banned:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
      }
  })
};
