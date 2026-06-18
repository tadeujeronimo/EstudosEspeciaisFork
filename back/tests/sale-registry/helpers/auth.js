const request = require('supertest');
const app = require('../../../app');

const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_SENHA = '123';

async function getAdminToken() {
  const res = await request(app)
    .post('/api/admin/login')
    .send({ email: ADMIN_EMAIL, senha: ADMIN_SENHA });

  if (res.status !== 200) {
    throw new Error(
      `Failed to obtain admin token. Status ${res.status}: ${JSON.stringify(res.body)}`
    );
  }

  return res.body.token;
}

module.exports = { getAdminToken, ADMIN_EMAIL, ADMIN_SENHA };
