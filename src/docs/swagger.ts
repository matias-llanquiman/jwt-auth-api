import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'JWT Authentication API',
      version: '1.0.0',
      description: 'API for Authentication using JWT (login & register)',
    },
    servers: [{ url: 'http://localhost:4000' }],
  },
  apis: ['src/routes/auth.route.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
