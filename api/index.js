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

const app = require('express')();
const { v4 } = require('uuid');

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;