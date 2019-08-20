require('dotenv').config();
const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const { createLogger } = require('./utils/logger');
const Container = require('./utils/container');
const controllers = require('./controllers');
const routerFactory = require('./router');
const db = require('./db');

const PORT = process.env.PORT || 3000;

const container = Container();

container.register(controllers);
container.register('router', routerFactory);
container.register('db', db);
const app = new Koa();

app.use(logger());
app.use(bodyParser({ jsonLimit: '10mb' }));

const { router } = container.draw;

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, () => {
  const log = createLogger({ isDev: true });
  log.info(`Done! Listening on http://localhost:${PORT}`);
});
