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
      },
      likes: {
        type: DataTypes.NUMBER,
      }
    },
    {
      timeStamps: false,
    }
  )
};
