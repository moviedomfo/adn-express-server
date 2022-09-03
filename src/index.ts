import 'dotenv/config'
import express from "express";
import path from 'path';
import cors from "cors";
import helmet from "helmet";
import { adnRouter } from "./services/adn/adn.router";
import morgan from 'morgan';
import { notFoundHandler } from "./common/not-found.middleware";
import { errorHandler } from './common/http-exception';
import swaggerUi from "swagger-ui-express";



require('dotenv').config();

 if (!process.env.PORT) {
    process.exit(1);
 }
 
const app = express();


app.set('views',path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());


//app.use(morgan('combined'));
//app.use(morgan('tiny'));
app.use(morgan('short'));


// /** Logging */
// itemsRouter.use(morgan('dev'));

// /** Logging */
// authRouter.use(morgan('dev'));

 app.get('/', function (req, res) {
    //res.send('Wellcome to ADN mutiation detector' );
    res.render('index');
  })
  
  app.use(express.static("public"));

  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );
 

/** Parse the request */
//itemsRouter.use(express.urlencoded({ extended: false }));


app.use('/api/adn',adnRouter);


// Attach the first Error handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

 

/**
 * Server Activation
 */
 app.listen(process.env.PORT || 5000, () => {
    console.log(`App listening on port ${process.env.PORT || 5000}`);
  });

