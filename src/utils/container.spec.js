const Container = require('./container');

describe('Container Tests', () => {
  it('Register test', () => {
    const container = Container();
    container.register('dep', () => 1);
    expect(container.resolve('dep')).toBe(1);
  });

  it('Cross dependency', () => {
    const container = Container();
    container.register('dep', () => 1);
    container.register('dep2', ({ dep }) => dep + 1);
    expect(container.resolve('dep2')).toBe(2);
  });

  it('Constant register', () => {
    const container = Container();
    container.register('dep', 1);
    container.register('sum', ({ dep }) => dep + 2);
    expect(container.resolve('sum')).toBe(3);
  });

  it('Proxy resolver', () => {
    const container = Container();
    container.register('dep', () => 1);
    expect(container.draw.dep).toBe(1);
  });

  it('Function as constant', () => {
    const container = Container();
    container.register('dep', () => 1, Container.types.CONSTANT);
    expect(container.draw.dep).toBeInstanceOf(Function);
    expect(container.draw.dep()).toBe(1);
  });

  it('Register from object', () => {
    const deps = {
      a: 1,
      b: ({ c }) => c + 1,
      c: ({ a }) => a + 7,
    };
    const container = Container();
    container.register(deps);
    expect(container.draw.a).toBe(1);
    expect(container.draw.b).toBe(9);
    expect(container.draw.c).toBe(8);
  });
});
