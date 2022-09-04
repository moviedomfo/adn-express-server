import express  from "express";
import ADNController from "../controllers/adn.controller";
import ServiceFactory from "../services/ServiceFactory";

export const adnRouter = express.Router();
const adnController= new ADNController(ServiceFactory.CreateIADNService());

adnRouter.post("/mutation", adnController.mutation);
adnRouter.get("/stats",  adnController.stats);
adnRouter.get("/",  adnController.getAll);
adnRouter.get("/:id",  adnController.getById);
adnRouter.delete("/mutation",  adnController.deleteAll);

