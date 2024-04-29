const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API for Car Rental System',
        version: '1.0.0',
    },
    servers: [
        {
            url: "http://localhost:8000",
            description: 'Development server',
        },
        {
            url: 'https://kim-ss-backend.vercel.app',
            description: 'Production server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

const swaggerOptions = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['routes/*.js'],
};


const swaggerDocs = swaggerJSDoc(swaggerOptions);

// module.exports = { swaggerSpec, swaggerUi };
module.exports = swaggerDocs