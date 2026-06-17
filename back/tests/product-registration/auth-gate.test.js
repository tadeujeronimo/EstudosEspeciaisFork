/**
 * Test suite: Authentication gate
 *
 * Verifies that protected cardápio write routes reject requests that have
 * no token, an invalid token, or a malformed Authorization header.
 * No database state is required — these checks are purely middleware-level.
 */
const request = require('supertest');
const app = require('../../app');

describe('Auth gate — protected cardápio routes', () => {
  // ── POST /api/cardapio ──────────────────────────────────────────────────────

  test('POST /api/cardapio without token → 401', async () => {
    const res = await request(app)
      .post('/api/cardapio')
      .send({ nome: 'Sem Token', preco: 1, categoria: 'Bebidas' });

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/token/i);
  });

  test('POST /api/cardapio with invalid token → 401', async () => {
    const res = await request(app)
      .post('/api/cardapio')
      .set('Authorization', 'Bearer token.invalido.mesmo')
      .send({ nome: 'Token Ruim', preco: 1, categoria: 'Bebidas' });

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/inv[aá]lido/i);
  });

  test('POST /api/cardapio with malformed Authorization header → 401', async () => {
    const res = await request(app)
      .post('/api/cardapio')
      .set('Authorization', 'not-even-bearer')
      .send({ nome: 'Header Ruim', preco: 1, categoria: 'Bebidas' });

    // jwt.verify will reject a non-JWT string as invalid
    expect(res.status).toBe(401);
  });

  // ── PUT /api/cardapio/:id ───────────────────────────────────────────────────

  test('PUT /api/cardapio/1 without token → 401', async () => {
    const res = await request(app)
      .put('/api/cardapio/1')
      .send({ nome: 'Atualizado', preco: 2, categoria: 'Bebidas' });

    expect(res.status).toBe(401);
  });

  // ── DELETE /api/cardapio/:id ────────────────────────────────────────────────

  test('DELETE /api/cardapio/1 without token → 401', async () => {
    const res = await request(app).delete('/api/cardapio/1');
    expect(res.status).toBe(401);
  });

  test('DELETE /api/cardapio/1 with invalid token → 401', async () => {
    const res = await request(app)
      .delete('/api/cardapio/1')
      .set('Authorization', 'Bearer invalido');

    expect(res.status).toBe(401);
  });
});
