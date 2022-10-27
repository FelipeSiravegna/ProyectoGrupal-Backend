const server = require('./src/app');
const { conn, User } = require('./src/db');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    await User.create({username:"Usuario1", email:"example@example.com", password:"passWord$2"});
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});