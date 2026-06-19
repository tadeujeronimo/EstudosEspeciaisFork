/**
 * Test suite: Sale Registry (Pedidos e Dashboard)
 *
 * Covers:
 *  - Public order creation (POST /api/pedidos)
 *  - Authenticated dashboard fetch (GET /api/dashboard)
 *  - Authenticated order status update (PUT /api/dashboard/:id)
 *
 */
const request = require('supertest');
const app = require('../../app');
const { getAdminToken } = require('./helpers/auth');
const {
  VALID_PICKUP_PIX,
  VALID_DELIVERY_CASH,
  INVALID_NEGATIVE_QTY,
  INVALID_DELIVERY_NO_ADDRESS,
  INVALID_CHANGE_AMOUNT,
} = require('./helpers/order-fixtures');

let token;
let deliveryOrderId;
let pickupOrderId;

beforeAll(async () => {
  token = await getAdminToken();
});

describe('Sale Registry - Integration Tests', () => {
  describe('POST /api/pedidos - Happy Paths', () => {
    test('T1: should create a pickup order successfully', async () => {
      const res = await request(app)
        .post('/api/pedidos')
        .send(VALID_PICKUP_PIX);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.nomeCliente).toBe(VALID_PICKUP_PIX.nomeCliente);
      expect(res.body.status).toBe('Pendente');
      expect(res.body.precoTotal).toBe(10); // 5.0 * 2
      expect(res.body.trocoPara).toBeNull();
      expect(res.body.rua).toBeNull();

      pickupOrderId = res.body.id;
    });

    test('T2: should create a delivery order with cash and change successfully', async () => {
      const res = await request(app)
        .post('/api/pedidos')
        .send(VALID_DELIVERY_CASH);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.nomeCliente).toBe(VALID_DELIVERY_CASH.nomeCliente);
      expect(res.body.rua).toBe(VALID_DELIVERY_CASH.rua);
      expect(res.body.trocoPara).toBe(VALID_DELIVERY_CASH.trocoPara);
      
      deliveryOrderId = res.body.id;
    });
  });

  describe('POST /api/pedidos - Edge Cases & Security', () => {
    test('E1: should reject order without required fields', async () => {
      const res = await request(app)
        .post('/api/pedidos')
        .send({ itens: [] }); // Missing nomeCliente and empty itens

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/obrigatórios/i);
    });

    test('E2: should reject order with negative quantities', async () => {
      const res = await request(app)
        .post('/api/pedidos')
        .send(INVALID_NEGATIVE_QTY);

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/inválidas/i);
    });

    test('E3: should reject order with invalid change amount', async () => {
      const res = await request(app)
        .post('/api/pedidos')
        .send(INVALID_CHANGE_AMOUNT);

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/troco inválido/i);
    });

    test('E4: should reject delivery order without complete address', async () => {
      const res = await request(app)
        .post('/api/pedidos')
        .send(INVALID_DELIVERY_NO_ADDRESS);

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/Endereço incompleto/i);
    });
  });

  describe('GET /api/dashboard - Administrative Flows', () => {
    test('A1: should reject if not authenticated', async () => {
      const res = await request(app).get('/api/dashboard');
      expect(res.status).toBe(401);
    });

    test('A2: should return the list of orders including the newly created ones', async () => {
      const res = await request(app)
        .get('/api/dashboard')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);

      const pickupOrder = res.body.find(o => o.id === pickupOrderId);
      const deliveryOrder = res.body.find(o => o.id === deliveryOrderId);
      
      expect(pickupOrder).toBeDefined();
      expect(deliveryOrder).toBeDefined();
      expect(pickupOrder.nomeCliente).toBe(VALID_PICKUP_PIX.nomeCliente);
    });
  });

  describe('PUT /api/dashboard/:id - Administrative Flows', () => {
    test('A1: should reject if not authenticated', async () => {
      const res = await request(app)
        .put(`/api/dashboard/${pickupOrderId}`)
        .send({ status: 'Concluído' });
      expect(res.status).toBe(401);
    });

    test('A3: should update order status successfully', async () => {
      const res = await request(app)
        .put(`/api/dashboard/${pickupOrderId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'Cancelado' });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('Cancelado');
    });

    test('A4: should reject update for non-existent order', async () => {
      const res = await request(app)
        .put('/api/dashboard/99999999')
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'Concluído' });

      // Prisma NotFound error causes 500 in this controller implementation
      expect(res.status).toBe(500);
    });
  });
});
