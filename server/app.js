const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const database = require('./src/database/connection')
const minIO = require('./minio-connect')
const minIOConnect = require('./minio-create-buckets')

app.use(cors())

//SET UP BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


//SET UP DOTENV 
require('dotenv').config()

//DATABASE CONNECTION
database.connection.isConnected()
database.connection.migrate()

//SET UP STATIC FILE
app.use(express.static('public'))

//REQUIRE ROUTE
const authenMiddleware = require('./src/middlewares/authen')
const userRoute = require('./src/routes/user')
const customerRoute = require('./src/routes/customer')
const storageRoute = require('./src/routes/storage')
const signatureRoute = require('./src/routes/signature')
const accountRoute = require('./src/routes/account')
const transactionRoute = require('./src/routes/transaction')
const exchangeRoute = require('./src/routes/exchange')
const exportFileRoute = require('./src/routes/exportFile')
const chargeRoute = require('./src/routes/chargeCollection')
const chequeRoute = require('./src/routes/cheque')
const creditRoute = require('./src/routes/creditTransaction')
const transferRoute = require('./src/routes/transferOperation')

//ROUTE DECLARATION
//authenMiddleware
app.use('/user', userRoute)
app.use('/customer', customerRoute)
app.use('/storage', storageRoute)
app.use('/signature', signatureRoute)
app.use('/account', accountRoute)
app.use('/transaction', transactionRoute)
app.use('/exchange', exchangeRoute)
app.use('/export', exportFileRoute)
app.use('/charge', chargeRoute)
app.use('/cheque', chequeRoute)
app.use('/credit', creditRoute)
app.use('/transfer', transferRoute)

//SET UP SWAGGER
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express Library API",
        termsOfService: "http://example.com/terms/",
        contact: {
          name: "API Support",
          url: "http://www.exmaple.com/support",
          email: "support@example.com",
        },
      },
  
      servers: [
        {
          url: "http://localhost:8080",
          description: "My API Documentation",
        },
      ],
    },
    apis: ["./Routes/*.js"],
  };
  
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// const swaggerDocument = require('./swagger.json')

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// MINIO
(async ()=>minIOConnect.connect())();

//HOST CONNECTION
app.listen(5006, () => {
    console.log("CONNECTED")
})
