require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs'); 
const path = require('path');
const {
    DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
  } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, List, Actor, Genre, Movies ,Director,Review } = sequelize.models;
console.log(sequelize.models)

// Relaciones
User.belongsToMany(List, {through: "user_list", timestamps:false});
List.belongsToMany(User, {through: "user_list", timestamps:false});

Movies.belongsToMany(Genre,{through:"movie_genres",timestamps:false})
Genre.belongsToMany(Movies,{through:"movie_genres",timestamps:false})

Actor.belongsToMany(Movies,{through:"actor_on_movies",timestamps:false})
Movies.belongsToMany(Actor,{through:"actor_on_movies",timestamps:false})

Director.belongsToMany(Movies,{through:"director_movies",timestamps:false})
Movies.hasOne(Director,{through:"director_movies",timestamps:false})

List.belongsToMany(Movies,{through:"movies_on_list",timestamps:false})
Movies.belongsToMany(List,{through:"movies_on_list",timestamps:false})

Review.hasOne(Movies)
Movies.hasMany(Review)


User.hasMany(Review)
Review.belongsTo(User)

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};