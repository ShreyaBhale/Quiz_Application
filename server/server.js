import express from 'express';
import morgan from 'morgan';
import cors from 'cors'             // used for cross domain data sharing
import { config } from 'dotenv';
import  router from './router/route.js'

/** import connection file */
import connect from './database/connection.js';

const app = express()

/** app middleware */
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

/**app port */
const port = process.env.PORT || 8080


/** routes */
app.use('/api', router)  /** api */

app.get('/', (req, res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
})

/** start server only when we have valid connection*/
connect().then(() => {
    try {
        app.listen(port, ()=> {
            console.log(`server connected to ${port}`)
        })
    } catch (error) {
        console.log("Cannot connect to the server")
    }

}).catch(error => {
    console.log("Invalid Database Connection");
})
