/**
 * Test suite: Admin login
 *
 * Verifies the POST /api/admin/login endpoint:
 *  - happy path returns a JWT
 *  - bad credentials are rejected with 401
 *  - missing fields are rejected with 400
 */
const request = require('supertest');
const app = require('../../app');
const { ADMIN_EMAIL, ADMIN_SENHA } = require('./helpers/auth');

describe('Admin login — POST /api/admin/login', () => {
  test('valid credentials → 200 + token', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: ADMIN_EMAIL, senha: ADMIN_SENHA });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
    expect(res.body.token.length).toBeGreaterThan(10);
    expect(res.body.admin.email).toBe(ADMIN_EMAIL);
  });

  test('wrong password → 401', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: ADMIN_EMAIL, senha: 'senha-errada' });

    expect(res.status).toBe(401);
  });

  test('unknown email → 401', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: 'naoexiste@teste.com', senha: ADMIN_SENHA });

    expect(res.status).toBe(401);
  });

  test('missing email → 400', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ senha: ADMIN_SENHA });

    expect(res.status).toBe(400);
  });

  test('missing senha → 400', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: ADMIN_EMAIL });

    expect(res.status).toBe(400);
  });

  test('empty body → 400', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({});

    expect(res.status).toBe(400);
  });
});
