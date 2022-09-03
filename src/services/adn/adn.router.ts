import express ,{ Request, Response,NextFunction  } from "express";
// import * as adnService from "./adn.service";
import ADNController from "./adn.service";
import { IMutationDto } from "models/MutationDto";
import { AppError } from "../../common/http-exception";
import ServiceFactory from "../../services/ServiceFactory";

export const adnRouter = express.Router();
const adnService =  ServiceFactory.CreateIADNService ();

adnRouter.post("/mutation", async (req: Request, res: Response,next: NextFunction) => {
    try {

      const body:IMutationDto =  req.body as  IMutationDto;
      
      const result = await adnService.Mutation(body);
      if(result)
        res.status(200).send();
      else 
        res.status(403).send();
      
    } catch (e) {
      next(e);
    }
  });


adnRouter.get("/stats", async (req: Request, res: Response,next: NextFunction) => {
    try {
      const result = await adnService.Stats();

      res.status(200).send(result);

    } catch (e) {
      
      next(e);
    }
  });

  adnRouter.get("/:id", async (req: Request, res: Response,next: NextFunction) => {
    try {

      const id =  req.params.id;
      const result = await adnService.GetById(id);
      if(result)
        res.status(200).send(result);
      else
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  });

  adnRouter.get("/", async (req: Request, res: Response,next: NextFunction) => {
    try { 
      const result = await adnService.GetAll();

      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);    }
  });




  adnRouter.delete("/mutation", async (req: Request, res: Response,next: NextFunction) => {
    try {
      await adnService.ClearAll();
  
      res.status(200).send(true);
    } catch (e) {
      next(e);    }
  });
  
