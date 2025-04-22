import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import fs from 'fs'
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Routes from './routes/index.js';
import { sequelize } from './configs/postgres.js';
import './models/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

const logStream = fs.createWriteStream(
    path.join(__dirname, '../access.log'),
    {flags: 'a'}
);

const corsOptions = {
    origin(origin, callback) {
        callback(null,true);
    },
    methods: 'GET, PUT, DELETE, POST, PATCH',
    credentials: true
}



app.use (morgan('combined', {stream: logStream}));
app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'} ));

Routes(app)
app.use((req, res) => {
    res.status(404).send('404 - pagina nao encontrada');
})

sequelize.authenticate().then(() => console.log('foi'))

app.listen(process.env.API_PORT, (e) => {
    if(e) {
        return console.log(e);
    }
    console.log(`Rodando na url http://localhost${process.env.API_PORT}`)
})

