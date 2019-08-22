const Container = () => {
  const modules = {};
  const constantMap = {};
  const draw = new Proxy(modules, {
    get: (target, prop) => {
      const val = target[prop] || null;
      if (val instanceof Function && !constantMap[prop]) {
        return val(draw);
      }
      return val;
    },
  });

  /**
   * Register a factory into container
   * @param {string|object} receiver Name of depency OR object of {name: function}
   * @param {function} [factory] Factory of dependency
   * @param {Symbol} [type] Type of dependency
   */
  const register = (receiver, factory = null, type = Container.types.FACTORY) => {
    if (factory) {
      const key = receiver.toString();
      constantMap[key] = type === Container.types.CONSTANT;
      modules[key] = factory;
      return;
    }
    Object.entries(receiver).forEach((items) => register(...items));
  };

  /**
   * Resolve the depency
   * @param {string} name Name of dependency to resolve
   */
  const resolve = (name) => draw[name];

  return Object.freeze({
    register,
    resolve,
    draw,
  });
};

Container.types = {
  FACTORY: Symbol('factory'),
  CONSTANT: Symbol('constant'),
};

module.exports = Container;
