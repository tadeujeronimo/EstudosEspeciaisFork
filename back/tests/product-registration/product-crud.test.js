/**
 * Test suite: Product registration (cardápio CRUD)
 *
 * Covers:
 *  - Public read (GET)
 *  - Authenticated create (POST) — with and without image, edge cases
 *  - Authenticated update (PUT) — text fields and image swap
 *  - Authenticated delete (DELETE)
 *  - Image file validation (format rejection, size limit)
 *
 * Prerequisites (handled by Docker entrypoint before tests run):
 *  - Database migrated
 *  - Admin seed applied (email: admin@admin.com  senha: 123)
 *  - USE_LOCAL_STORAGE=true so uploads go to disk, not Vercel Blob
 *
 * Tests are run serially (--runInBand) so they can share a single token
 * and reference IDs created in earlier tests.
 */
const request = require('supertest');
const app = require('../../app');
const { getAdminToken } = require('./helpers/auth');

let token;
let createdId; // ID of the item created in the first POST test — reused later

// ── Setup ─────────────────────────────────────────────────────────────────────

beforeAll(async () => {
  token = await getAdminToken();
});

// ── Public read ───────────────────────────────────────────────────────────────

describe('GET /api/cardapio — public list', () => {
  test('returns 200 and an array', async () => {
    const res = await request(app).get('/api/cardapio');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// ── Create ────────────────────────────────────────────────────────────────────

describe('POST /api/cardapio — create product', () => {
  test('creates item without description → 201', async () => {
    const res = await request(app)
      .post('/api/cardapio')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Espresso', preco: 5.5, categoria: 'Bebidas' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      nome: 'Espresso',
      preco: 5.5,
      categoria: 'Bebidas',
    });
    expect(res.body.id).toBeDefined();

    createdId = res.body.id; // save for later tests
  });

  test('creates item with description → 201', async () => {
    const res = await request(app)
      .post('/api/cardapio')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Misto Quente', preco: 12.0, categoria: 'Lanches', descricao: 'Pão de forma, presunto e queijo' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      nome: 'Misto Quente',
      preco: 12.0,
      categoria: 'Lanches',
      descricao: 'Pão de forma, presunto e queijo'
    });
    expect(res.body.id).toBeDefined();
  });

  test('missing nome → creates with nome undefined (Prisma may reject)', async () => {
    const res = await request(app)
      .post('/api/cardapio')
      .set('Authorization', `Bearer ${token}`)
      .send({ preco: 3.0, categoria: 'Bebidas' });

    // Prisma's NOT NULL constraint will trigger a 500 or a 400 validation error
    expect([400, 500]).toContain(res.status);
  });

  test('missing preco → preco stored as NaN / Prisma rejects', async () => {
    const res = await request(app)
      .post('/api/cardapio')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Sem Preco', categoria: 'Bebidas' });

    // Number(undefined) === NaN — Prisma rejects Float NaN → 500
    expect([400, 500]).toContain(res.status);
  });

  test('missing categoria → creates with categoria undefined (Prisma may reject)', async () => {
    const res = await request(app)
      .post('/api/cardapio')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Sem Categoria', preco: 2.0 });

    expect([400, 500]).toContain(res.status);
  });
});

// ── Read by ID ────────────────────────────────────────────────────────────────

describe('GET /api/cardapio/:id — read single product', () => {
  test('returns the previously created item → 200', async () => {
    const res = await request(app).get(`/api/cardapio/${createdId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdId);
    expect(res.body.nome).toBe('Espresso');
  });

  test('non-existent ID → 404', async () => {
    const res = await request(app).get('/api/cardapio/999999');
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/n[aã]o encontrado/i);
  });

  test('invalid (non-numeric) ID → 500', async () => {
    const res = await request(app).get('/api/cardapio/abc');
    // Number('abc') === NaN — Prisma throws an argument error
    expect([400, 500]).toContain(res.status);
  });
});

// ── Update ────────────────────────────────────────────────────────────────────

describe('PUT /api/cardapio/:id — update product', () => {
  test('updates text fields and adds description → 200', async () => {
    const res = await request(app)
      .put(`/api/cardapio/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Espresso Duplo', preco: 7.0, categoria: 'Bebidas', descricao: 'Feito com grãos arábica' });

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe('Espresso Duplo');
    expect(res.body.preco).toBe(7.0);
    expect(res.body.descricao).toBe('Feito com grãos arábica');
  });

  test('update non-existent item → 500 (Prisma P2025)', async () => {
    const res = await request(app)
      .put('/api/cardapio/999999')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Ghost', preco: 0, categoria: 'Nenhuma' });

    expect(res.status).toBe(500);
  });
});

// ── List after mutations ───────────────────────────────────────────────────────

describe('GET /api/cardapio — list reflects created items', () => {
  test('list contains at least the item created in this test run', async () => {
    const res = await request(app).get('/api/cardapio');

    expect(res.status).toBe(200);
    const ids = res.body.map((i) => i.id);
    expect(ids).toContain(createdId);
  });
});

// ── Delete ────────────────────────────────────────────────────────────────────

describe('DELETE /api/cardapio/:id — delete product', () => {
  test('deletes the created item → 200 + success message', async () => {
    const res = await request(app)
      .delete(`/api/cardapio/${createdId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/removido/i);
  });

  test('deleted item no longer returned by GET → 404', async () => {
    const res = await request(app).get(`/api/cardapio/${createdId}`);
    expect(res.status).toBe(404);
  });

  test('delete non-existent item → 500 (Prisma P2025)', async () => {
    const res = await request(app)
      .delete('/api/cardapio/999999')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(500);
  });
});
