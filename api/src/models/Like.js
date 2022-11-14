const {DataTypes} = require ('sequelize');

module.exports =(sequelize)=>{
    sequelize.define("like",
        {
            id:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
                
            },
            like: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
              },
        },
        {
            timestamps: false,
          })
}
