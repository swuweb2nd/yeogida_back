const express = require('express');
const app = express();

const swaggerUi = require("swagger-ui-express");

const swaggerJSDoc = require("swagger-jsdoc")

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Yeogida",
            version: "1.0.0",
            description: "SWUWEB YEOGIDA API 문서",
        },
        servers: [
            {
                url: "http://localhost:3000/",
            },
        ],
    },
    apis: ["./routes/*.js"],
}

const specs = swaggerJSDoc(options);

module.exports = { swaggerUi, specs };