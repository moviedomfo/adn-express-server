import { Request, Response } from "express";
import * as express from "express";
import * as adnService from "./adn.service";
import { IMutationDto } from "models/MutationDto";

export const adnRouter = express.Router();

adnRouter.post("/mutation", async (req: Request, res: Response) => {
    try {

      const body:IMutationDto =  req.body as  IMutationDto;

      const result = await adnService.MutationVerify(body);
      if(result)
        res.status(200).send();
      else 
        res.status(403).send();
      
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  adnRouter.get("/:id", async (req: Request, res: Response) => {
    try {

      const id =  req.params.id;

      const result = await adnService.GetById(id);
      if(result)
        res.status(200).send(result);
      else
      res.status(204).send();
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  adnRouter.get("/", async (req: Request, res: Response) => {
    try {


      const result = await adnService.GetAll();
  
      if(result)
        res.status(200).send(result);
      else
      res.status(204).send();
    } catch (e) {
      res.status(500).send(e.message);
    }
  });


  adnRouter.get("/stats", async (req: Request, res: Response) => {
    try {

      
      const result = await adnService.Stats();
  
      res.status(200).send(result);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  adnRouter.delete("/mutation", async (req: Request, res: Response) => {
    try {

      await adnService.ClearAll();
  
      res.status(200).send(true);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
  
