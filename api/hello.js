// const jsonServer = require('json-server')
// const auth = require('json-server-auth')
// const path = require('path')
// const chalk = require('chalk');

// function prettyPrint(object) {
//   console.log();
//   console.log(chalk.bold('Resources'));

//   for (const prop in object) {
//     console.log(`  /${prop}`);
//   }
//   console.log();
// }

// const server = jsonServer.create({
//   noCors: true
// })
// const router = jsonServer.router(path.join(process.cwd(), 'server', 'db.json'))
// const middlewares = jsonServer.defaults()

// server.db = router.db

// server.use(middlewares)
// server.use(auth)
// server.use(router)

// if (require.main === module) {
//   server.listen(5000, () => {
//     prettyPrint(router.db.getState());
//     console.log('JSON Server is running')
//   })
// }

// module.exports = server;

export default function handler(request, response) {
  const { name } = request.query;
  response.status(200).send(`Hello ${name}!`);
}