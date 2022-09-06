// import "dotenv/config";
// import express from "express";
// import path from "path";
// import cors from "cors";
// import helmet from "helmet";
// import { adnRouter } from "./route/adn.router";
// import morgan from "morgan";
// import { notFoundHandler } from "./common/not-found.middleware";
// import { errorHandler } from "./common/http-exception";
// import swaggerUi from "swagger-ui-express";
// import {  InversifyExpressServer} from "inversify-express-utils";

// import container from "./common/Container";


// require("dotenv").config();
// if (!process.env.PORT) {
//   process.exit(1);
// }
// export default class App {
//   public port?: number = parseInt(process.env.PORT) || 5000;
//   private app: express.Application;
//   private server: InversifyExpressServer;

//   constructor() {
//     this.server = new InversifyExpressServer(container);
//     this.app = this.server.build();
//   }

//   public init() {
//     this.server.setConfig((app: express.Application) => {
     
//       this.app.use(express.json({ limit: "5mb" }));
//     });
//   }
//   public build() {

//     this.app.set("views", path.join(__dirname, "views"));
//     this.app.engine("html", require("ejs").renderFile);
//     this.app.set("view engine", "html");

//     /**
//      *  App Configuration
//      */
//     this.app.use(helmet());
//     this.app.use(cors());

//     this.app.use(express.json());
//     this.app.use(morgan("short"));

//     this.app.get("/", function (req, res) {
//       res.render("index");
//     });

//     this.app.use(express.static("public"));

//     this.app.use(
//       "/docs",
//       swaggerUi.serve,
//       swaggerUi.setup(undefined, {
//         swaggerOptions: {
//           url: "/swagger.json",
//         },
//       })
//     );

//     /** Parse the request */
//     //itemsRouter.use(express.urlencoded({ extended: false }));

//     this.app.use("/api/adn", adnRouter);

//     // Attach the first Error handling Middleware
//     this.app.use(notFoundHandler);
//     this.app.use(errorHandler);
//   }

//   public listen() {
//     this.app.listen(this.port, () => {
//       console.log(`App listening on port ${this.port}`);
//     });
//   }
// }
