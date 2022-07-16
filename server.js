import 'dotenv/config'

import express from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
/* import routers */
import { router as personRouter } from './routers/person-router.js'

/* create an express app and use JSON */
const app = new express()
app.use(express.json())

/* set up swagger in the root */
const swaggerDocument = YAML.load('api.yaml')
app.use('/apidoc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

/* bring in some routers */
app.use('/person', personRouter)

/* bring in some routers */
app.use('/echo', (req, res) => {
    console.log(`API echo req ${req}`);
    res.send({
      message: `API echo calling`, 
      timestamp:  `${new Date()}`
    })
})


/* start the server */
app.listen(8080)
