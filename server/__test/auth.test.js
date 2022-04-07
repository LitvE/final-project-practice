/*function sum(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError();
  }
  return a + b;
}*/

/*test("Sum 2+2 equals 4", () => {
  const result = sum(2, 2);
  expect(result).toBe(4);
});*/
/*
test("Sum 2+2 equals 4", () => {
  expect(sum(2, 2)).toBe(4);
});

test("Sum '2':string + '2':string equal 4:number", () => {
  expect(() => sum("2", "2")).toThrow(TypeError);
});*/

const request = require('supertest');
const {sequelize, User} = require('../db/models');
const {createApp} = require('../app');
const app = createApp();
const yup = require('yup');
const testUser = {
    firstName: `Test${Date.now()}`,
    lastName:  `Surname${Date.now()}`,
    displayName: `DName${Date.now()}`,
    email: `test${Date.now()}@email.com`,
    password: 'qwerty',
    role: 'customer',
};
beforeAll( () => User.create(testUser));
afterAll( () => sequelize.close());
const authBodySchema = yup.object({
    data: yup.object({
        user: yup.object().required(),
        tokenPair: yup.object({
            accessToken: yup.string().required(),
            refreshToken: yup.string().required(),
        }).required()
    })
}).required();
describe('LOGIN', () => {
    test('User must login successfully', async () => {
        const {status , body} = await (await request(app).post('/api/login')).setEncoding({
            email: testUser.email,
            password: testUser.password,
        }); 
        expect(status).toBe(201);
        expect(await authBodySchema.isValid(body)).toBe(true);
    });
    test('User login error with status 403', async () => {
        const {status , body} = await (await request(app).post('/api/login')).setEncoding({
            email: 'testemail@gmail.com',
            password: 'qwerty',
        }); 
        expect(status).toBe(403);
    })
}); 
