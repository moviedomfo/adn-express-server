
import container from "../common/Container";
import express  from "express";
import ADN2Controller from "../controllers/adn2.controller";
import ServiceFactory from "../services/ServiceFactory";


export const adnRouter = express.Router();
//const adnController= new ADNController(ServiceFactory.CreateIADNService());
//const adnController =  container.resolve<ADNController>('adnController');

const adnController= new ADN2Controller(ServiceFactory.CreateIADNService());

adnRouter.post("/mutation", adnController.Mutation);
adnRouter.get("/stats",  adnController.Stats);
adnRouter.get("/",  adnController.GetAll);
adnRouter.get("/:id",  adnController.GetById);
adnRouter.delete("/mutation",  adnController.ClearAll);

