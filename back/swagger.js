const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Café Gourmet API',
    description: 'Documentação da API da Cafeteria',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:4000/api',
      description: 'Development Server',
    },
    {
      url: 'https://cafe-gourmet-back.vercel.app/api',
      description: 'Production Server',
    },
  ],
  tags: [
    {
      name: 'Cardápio',
      description: 'Endpoints do cardápio',
    },
    {
      name: 'Pedidos',
      description: 'Endpoints de pedidos',
    },
    {
      name: 'Admin',
      description: 'Endpoints administrativos',
    },
    {
      name: 'Dashboard',
      description: 'Endpoints do dashboard',
    },
  ],
};

const routes = [
  './src/routes/cardapioRoutes.js',
  './src/routes/pedidosRoutes.js',
  './src/routes/adminRoutes.js',
  './src/routes/dashboardRoutes.js',
];

swaggerAutogen('./swagger.json', routes, doc);
