const jsonServer = require('json-server')
const auth = require('json-server-auth')
const path = require('path')
const chalk = require('chalk');

function prettyPrint(object) {
  console.log();
  console.log(chalk.bold('Resources'));

  for (const prop in object) {
    console.log(`  /${prop}`);
  }
  console.log();
}

const server = jsonServer.create({
  noCors: true
})
const router = jsonServer.router(path.join(__dirname, '../server', 'db.json'))
const middlewares = jsonServer.defaults()

server.db = router.db

server.use(middlewares)
server.use(auth)
server.use(router)

server.listen(3001, () => {
  prettyPrint(router.db.getState());
  console.log('JSON Server is running')
})

module.exports = server;

