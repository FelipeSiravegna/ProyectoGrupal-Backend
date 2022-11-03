const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequilize) =>{
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
      active:{
        type: DataTypes.BOOLEAN,
        defaultValue:true,
      }
    },
    {
      timestamps: false,
    }
  );
};
