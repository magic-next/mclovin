const factory = () => {
  const controller = {};

  controller.createUser = (ctx) => {
    ctx.body = 'OK';
  };

  return Object.freeze(controller);
};

module.exports = factory;
