import { AppConstants } from './common/CommonConstants';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import { adnRouter } from './infra/adn.router';
import morgan from 'morgan';
import { notFoundHandler } from './common/not-found.middleware';
import { errorHandler } from './common/ExpressErrorHandler';
import './infra/db/MondoDatabase';
require('dotenv').config();

if (!AppConstants.PORT) {
  process.exit(1);
}

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(morgan('short'));
// app.use(helmet());
// Sets all of the defaults, but overrides `script-src`
// and disables the default `style-src`.
//Esto permitirá la ejecución de scripts desde cdn.jsdelivr.net
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'self'", 'cdn.jsdelivr.net'],

        'style-src': [
          "'self'",
          'cdn.jsdelivr.net',
          "'self'",
          "'unsafe-inline'",
        ],
      },
    },
  })
);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));
//logger middleware--> ::1 - - [13/Jan/2022:15:23:23 +0000] "GET /api/fakes/gertUsers HTTP/1.1" 200 801 "-" "PostmanRuntime/7.28.4"
//app.use(morgan('combined'));
// logger middleware --> GET /api/fakes/gertUsers 200 801 - 190.525 ms
//app.use(morgan('tiny'));
//:remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms

app.get('/', function (_req, res) {
  res.render('index');
});
app.get('/health', function (_req, res) {
  res.send(`ADN demo server ${AppConstants.APP_VERSION}  successfully`);
  // res.render('health', {
  //   APP_VERSION: AppConstants.APP_VERSION,
  //   COMPANY: AppConstants.COMPANY,
  // });
});

app.use('/api/adn', adnRouter);

// error handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * Server Activation
 */
app.listen(AppConstants.PORT, () => {
  console.log(`App listening on port ${AppConstants.PORT}`);
});
