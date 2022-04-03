/*
function sum(a, b){
  return a+b;
}

// eslint-disable-next-line no-undef
test('Sum 2+2 equal 4', () => {
  const result = sum(2, 2);
  // eslint-disable-next-line no-undef
  expect(result).toBe(4);
});

// eslint-disable-next-line no-undef
test('Sum NaN + some value equal NaN', () => {
  // eslint-disable-next-line no-undef
  expect(sum(NaN, 1)).toBe(NaN);
});*/

const request = require('supertest');
const { sequelize, User } = require('../db/models');
const { createApp } = require('../app');
const yup = require('yup');

const app = createApp;

const testUser = {
  firstName: `Name${Date.now()}`,
  lastName: `Surname${Date.now()}`,
  displayName: `Name${Date.now()}`,
  email: 'test@gmail.com',
  password: 'qwerty',
  role: 'customer',
};

// eslint-disable-next-line no-undef
beforeAll(() => User.create(testUser));
// eslint-disable-next-line no-undef
afterAll(() => sequelize.close());

const authBodySchema = yup.object({
  data: yup.object({
    user: yup.object().required(),
    tokenPair: yup.object({
      accessToken: yup.string().required(),
      refreshToken: yup.string().required(),
    }).required(),
  }),
}).required();

// eslint-disable-next-line no-undef
describe('LOGIN', () => {
  // eslint-disable-next-line no-undef
  test('User must login successfully', async () => {
    const { status, body } = await (await request(app).post('/api/login')).setEncoding({
      email: testUser.email,
      password: testUser.password,
    });
    // eslint-disable-next-line no-undef
    expect(status).toBe(200);
    // eslint-disable-next-line no-undef
    expect(await authBodySchema.isValid(body)).toBe(true);
  });
});

