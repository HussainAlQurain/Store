import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import routes from './routes';
import morgan from 'morgan';

const app: express.Application = express()
const address: string = "http://localhost:8080"

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use('/api', routes)

app.get('/', function (req: Request, res: Response) {
    res.redirect('/api');
})

app.listen(8080, function () {
    console.log(`starting app on: ${address}`)
})

export default app;