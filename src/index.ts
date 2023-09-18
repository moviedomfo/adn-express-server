import { AppConstants } from './common/commonConstants';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import { adnRouter } from './infra/adn.router';
import morgan from 'morgan';
import { notFoundHandler } from './common/not-found.middleware';
import { errorHandler } from './common/http-exception';
import './infra/db/MondoDatabase';
require('dotenv').config();

if (!AppConstants.PORT) {
  process.exit(1);
}

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
/**
 *  App Configuration
 */
app.use(helmet());

app.use(cors());
app.use(express.json());

//logger middleware--> ::1 - - [13/Jan/2022:15:23:23 +0000] "GET /api/fakes/gertUsers HTTP/1.1" 200 801 "-" "PostmanRuntime/7.28.4"
//app.use(morgan('combined'));
// logger middleware --> GET /api/fakes/gertUsers 200 801 - 190.525 ms
//app.use(morgan('tiny'));
//:remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
app.use(morgan('short'));
// itemsRouter.use(morgan('dev'));


app.get('/', function (req, res) {
  res.render('index');
});

/** Parse the request */
//itemsRouter.use(express.urlencoded({ extended: false }));

app.use('/api/adn', adnRouter);

// Attach the first Error handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * Server Activation
 */
app.listen(AppConstants.PORT, () => {
  console.log(`App listening on port ${AppConstants.PORT}`);
});
