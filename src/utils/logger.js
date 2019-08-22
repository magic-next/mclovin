/**
 * Create a application middleware logger
 * @param {object} config
 * @param {boolean} config.isDev
 */
const createLogger = ({ isDev = false } = {}) => {
  if (!isDev) {
    // TODO: Logger in prod
    const logger = { ...console };
    logger.info = logger.log;
    return logger;
  }
  const logger = { ...console };
  logger.info = logger.log;
  return logger;
};
exports.createLogger = createLogger;
