const Container = () => {
  const modules = {};
  const draw = new Proxy(modules, {
    get: (target, prop) => {
      const val = target[prop] || null;
      if (!val) {
        return null;
      }
      return val(draw);
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
      modules[key] = type(factory);
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

const CONSTANT = (target) => () => target;
const FACTORY = (target) => {
  if (!(target instanceof Function)) {
    return CONSTANT(target);
  }
  return (draw) => target(draw);
};

Container.types = {
  FACTORY,
  CONSTANT,
};

module.exports = Container;
