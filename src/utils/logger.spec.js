const { createLogger } = require('./logger');

describe('Logger tests', () => {
  it('Dev tests', () => {
    const logger = createLogger();
    const methods = ['info', 'debug', 'warn', 'error'];
    methods.forEach((method) => expect(typeof logger[method]).toBe('function'));
  });
});
