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

  it('Constante register', () => {
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
});
