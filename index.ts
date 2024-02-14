import express from 'express'
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as mongoose from 'mongoose';


dotenv.config({
    'path': path.join(process.cwd(), '.env')
});


const app = express()
const port: number = parseInt(process.env.PORT||'3030');

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))