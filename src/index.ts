import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { adnRouter } from "./adn/adn.router";
import morgan from 'morgan';
import { notFoundHandler } from "./common/not-found.middleware";
import { logsHandler,logsHandlerADN } from "./common/log.middlewar";
 import { engine } from 'express-handlebars';
import { create } from 'express-handlebars';
import path from 'path';
dotenv.config();

 if (!process.env.PORT) {
    process.exit(1);
 }
 
 //const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();
const PORT = process.env.PORT || 3000;

const hbs = create({ /* config */ });

const viewPath = path.join(__dirname,'views');
app.set('views', viewPath);

// Register `hbs.engine` with the Express app.
app.engine('.hbs', engine(
      {
         // layoutsDir: path.join(app.get('views'),'layouts'),
         // defaultLayout:'main',
         extname: '.hbs'
      }
         ));
app.set('view engine', '.hbs');



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


// /** Logging */
// itemsRouter.use(morgan('dev'));

// /** Logging */
// authRouter.use(morgan('dev'));
app.get('/', function (req, res) {
   res.render('index.html');
 })

/** Parse the request */
//itemsRouter.use(express.urlencoded({ extended: false }));
app.use(logsHandlerADN);

app.use('/api/adn',adnRouter);



// errorHandler won't catch 404 errors. 
app.use(notFoundHandler);
 

/**
 * Server Activation
 */
 app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

