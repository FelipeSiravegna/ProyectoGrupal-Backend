const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequilize) =>{
  sequilize.define("genre",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
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
