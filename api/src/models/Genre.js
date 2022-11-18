const { DataTypes } = require("sequelize");

module.exports = (sequilize) => {
  sequilize.define("genre",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  )
};
