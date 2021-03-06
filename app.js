import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import index from './server/routes/index';
import cors from 'cors';

const app = express();


app.use(cors());

// port
const port = process.env.PORT || 3000;
app.set('port', port);

// log request to console
app.use(logger('dev'));

// parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', index);
app.use('/', express.static('ui'));
app.use('/account', express.static('./ui/account.html'));

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

export default app;