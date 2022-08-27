import { MutationDto } from './MutationDto';
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


      const result = await adnService.Stats();
  
      res.status(200).send(result);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
  
