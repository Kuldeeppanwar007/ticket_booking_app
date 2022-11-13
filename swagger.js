const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/Router.js']

swaggerAutogen(outputFile, endpointsFiles)