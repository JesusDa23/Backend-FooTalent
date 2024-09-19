import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Footalent',
            version: '1.0.0',
            description: 'API para la gestion de flota de vehiculos',
            contact: {
                name: 'Javier',
                email: ''
            }
        },
        servers: [
            {
                url: 'http://localhost:3100',
                description: 'Development server'
            },
            {
                url: 'https://api.footalent.com',
                description: 'Production server'
            }
        ],
        tags: [
            {
                name: 'Auth',
                description: 'Endpoints para la autenticacion de usuarios'
            }
        ]
    },

    apis: ['./src/docs/*.yaml']
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

export const swaggerDocs = (app, port) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
