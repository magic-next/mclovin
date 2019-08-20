require('dotenv').config();
const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const { createLogger } = require('./utils/logger');
const Container = require('./utils/container');
const controllers = require('./controllers');
const services = require('./services');
const models = require('./models');
const routerFactory = require('./router');
const errorMiddleware = require('./middlewares/error');

const db = require('./db');
const utils = require('./utils');
const config = require('./config');

const PORT = process.env.PORT || 3000;

const container = Container();

container.register(controllers);
container.register(models);
container.register(services);
container.register('router', routerFactory);
container.register('db', db);
container.register('config', config);
container.register('utils', utils);
const app = new Koa();

app.use(logger());
app.use(bodyParser({ jsonLimit: '10mb' }));

const { router } = container.draw;

app
  .use(errorMiddleware())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, () => {
  const log = createLogger({ isDev: true });
  log.info(`Done! Listening on http://localhost:${PORT}`);
});
