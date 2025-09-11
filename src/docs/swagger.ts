import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JWT Authentication API',
      version: '1.0.0',
      description: 'API for Authentication using JWT (login & register)',
    },
  },
  apis: ['../routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
