import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { configRoutes } from './routes';

const app: Application = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configRoutes(app);

app.listen(PORT, (): void => {
    console.log(`hotConnected successfully on port ${PORT}`);
    console.log(`Example app listening at http://localhost:${PORT}`)
});