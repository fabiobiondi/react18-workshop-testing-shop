const jsonServer = require('json-server')
const auth = require('json-server-auth')
const path = require('path')
const chalk = require('chalk');

console.log('Starting server...');

function prettyPrint(object) {
  console.log();
  console.log(chalk.bold('Resources'));

  for (const prop in object) {
    console.log(`  /${prop}`);
  }
  console.log();
}

const server = jsonServer.create({
  noCors: true,
})
const router = jsonServer.router(path.join(process.cwd(), 'server', 'db.json'))
const middlewares = jsonServer.defaults()

server.db = router.db

server.use(middlewares)
// server.use(auth)
server.get('/', (request, response) => {
  console.log('Starting request...');
  const { name } = request.query;
  response.status(200).send(`Hello ${name}!`);
})
// server.use(router)

// if (require.main === module) {
server.listen(5000, () => {
  prettyPrint(router.db.getState());
  console.log('JSON Server is running')
})
// }

// export default server;


export default function handler(request, response) {
  console.log('Starting request...');
  const { name } = request.query;
  response.status(200).send(`Hello ${name}!`);
}