const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const DB_connection=require('./database.js');
const userRoute =require('./routes/userRoute.js');
const { errorHandler } = require('./middlewares/app.js')


const app = express();
app.use(cors({origin:'http://localhost:4200'}))
app.use(bodyParser.json());

app.use(express.static('uploads'));
app.use('/api/userInfo',userRoute);

app.use(errorHandler)

DB_connection()
    .then(()=>{
        console.log('Database Connected..!');

        app.listen(3000,()=>console.log(`server started at 3000`));

    })
    .catch(err=>console.log(err));