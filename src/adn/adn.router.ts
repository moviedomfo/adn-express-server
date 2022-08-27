import { MutationDto } from './MutationDto';
// The logic of the controllers is compact as they delegate the bulk of their operations to the 
// functions of the ItemService module. I

import { Request, Response } from 'express';
import * as express from "express";
import * as adnService from "./adn.service";



export const adnRouter = express.Router();


adnRouter.post("/mutation", async (req: Request, res: Response) => {
    try {

      const body:MutationDto =  req.body as  MutationDto;

      const result = await adnService.MutationVerify(body);
  
      res.status(200).send(result);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
  


  adnRouter.get("/stats", async (req: Request, res: Response) => {
    try {

      const body:MutationDto =  req.body as  MutationDto;

      const result = await adnService.MutationVerify(body);
  
      res.status(200).send(result);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
  
