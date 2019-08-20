require('dotenv').config();
const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const { createLogger } = require('./utils/logger');
const router = require('./router');

const PORT = process.env.PORT || 3000;
const app = new Koa();

app.use(logger());
app.use(bodyParser({ jsonLimit: '10mb' }));

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, () => {
  const log = createLogger({ isDev: true });
  log.info(`🙋  Done! Listening on http://localhost:${PORT}`);
});
