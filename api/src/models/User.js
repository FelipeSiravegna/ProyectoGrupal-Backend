const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [3, 20],
                noSpaces: function (value) {
                    if (value.split("").includes(" ")) throw new Error(`Validation noSpaces: The username can't contain spaces`);
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [7, 31],
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 30],
                is: function (value) {
                    const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    if (!regExp.test(value)) throw new Error("The password must contain:\r8-15 characters\rOne or multiple numbers and a special characters (@, $, !, %, *, ?, &)\rAt least a capital letter");
                }
            }
        },
        image: {
            type: DataTypes.TEXT,
            defaultValue: "https://res.cloudinary.com/dib474iu5/image/upload/v1668128824/TheCornerMovies/Logo_prhllw.png",
            allowNull: false,
            validation: {
                len: [0, 10000]
            }
        },
        playLists: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            validate: {
                isInt: true
            }
        },
        following: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: []
        },
        followers: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: []
        },
        premium: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        banned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false,
    });
};