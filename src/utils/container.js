const Container = () => {
  const modules = {};
  const draw = new Proxy(modules, {
    get: (target, prop) => {
      const val = target[prop] || null;
      if (val instanceof Function) {
        return val(draw);
      }
      return val;
    },
  });

  /**
   * Register a factory into container
   * @param {string|object} receiver Name of depency OR object of {name: function}
   * @param {function} [factory] Factory of dependency
   */
  const register = (receiver, factory = null) => {
    if (factory) {
      Object.assign(modules, {
        [receiver.toString()]: factory,
      });
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

module.exports = Container;
