const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('./index');

describe('Utility functions tests', () => {
  it('"to" testing', async () => {
    const [err, data] = await utils.to(Promise.resolve(1));
    expect(err).toBe(null);
    expect(data).toBe(1);
    const [exc, otherData] = await utils.to(Promise.reject(new Error()));
    expect(otherData).toBe(null);
    expect(exc).toBeInstanceOf(Error);
  });

  it('createError testing', () => {
    const message = 'Holy Shit';
    const defaultStatus = utils.createError({ message });
    expect(defaultStatus).toBeInstanceOf(Error);
    expect(defaultStatus.message).toBe(message);
    expect(defaultStatus.status).toBe(400);
  });

  it('Encrypt testing', async () => {
    const message = 'Blue is the best color';
    const numSalt = 1;
    const encripted = await utils.hash(message, numSalt);
    const verify = await bcrypt.compareSync(message, encripted);
    expect(verify).toBe(true);
  });

  it('Verify encripted text testing', async () => {
    const message = 'Blue is the best color';
    const numSalt = 1;
    const encripted = await bcrypt.hash(message, numSalt);
    const verify = await utils.verifyHash(message, encripted);
    expect(verify).toBe(true);
  });

  it('JWT Sign test', () => {
    const data = { planeswalker: true };
    const key = 'Liliana best Planeswalker';
    const token = utils.sign(data, key);
    const decripted = jwt.verify(token, key);
    expect(decripted).toMatchObject({ planeswalker: true });
  });

  it('JWT Decript test', () => {
    const data = { planeswalker: true };
    const key = 'Liliana best Planeswalker';
    const token = jwt.sign(data, key);
    const decripted = utils.verify(token, key);
    expect(decripted).toMatchObject({ planeswalker: true });
  });

  it('JWT Decript Error test', () => {
    const data = { planeswalker: true };
    const key = 'Liliana best Planeswalker';
    const token = jwt.sign(data, key);
    const decript = () => utils.verify(token, 'invalid-key');
    expect(decript).toThrowError('invalid signature');
  });
});
