require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require("./swaggerConfig"); 
const mongoose = require('mongoose');
const currenciesRoutes = require('./routes/currencies');
const cors = require('cors');

const app = express();
app.use(cors());

// Middleware de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

//routes
app.use('/currencies', currenciesRoutes);

// connect to db
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.MONGO_DB_NAME}`)
.then(() => {
    console.log('connected to db');

    //listen for request
    app.listen(process.env.PORT, () => {
        console.log(`listening on port: ${process.env.PORT}'`);
    })
})
.catch((err) => {
    console.log(err);
})

