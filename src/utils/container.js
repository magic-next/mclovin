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
   * @param {string} name Name of depency
   * @param {function} factory Factory of dependency
   */
  const register = (name, factory) => Object.assign(modules, {
    [name]: factory,
  });

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
