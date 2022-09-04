
import { TYPES } from "../common/types";
import { Request, Response, NextFunction } from "express";
import { IMutationDto } from "models/MutationDto";
import { IADNService } from "../services/adn.service";
import ServiceFactory from "../services/ServiceFactory";
import {  inject } from "inversify";

const adnService = ServiceFactory.CreateIADNService();

export default class ADNController {
  adnService: IADNService;

  constructor(@inject(TYPES.ADNService) adnService: IADNService) {

      //_adnService = ServiceFactory.CreateIADNService();
      this.adnService = adnService;
  }

  async mutation(req: Request, res: Response, next: NextFunction) {
    try {
      const mutationDTO: IMutationDto = req.body as IMutationDto;
      const result = await adnService.Mutation(mutationDTO);
      if (result) res.status(200).send();
      else res.status(403).send();
    } catch (e) {
      next(e);
    }
  }

  async stats(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await adnService.Stats();
      res.status(200).send(result);
    } catch (e) {
      next(e);
    }
  }


  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await adnService.GetAll();

      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id =  req.params.id;
      const result = await adnService.GetById(id);

      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  }

  async deleteAll(req: Request, res: Response, next: NextFunction) {
    try {
      
      const result = await adnService.ClearAll();
       res.status(200).send(true);
    } catch (e) {
      next(e);
    }
  }
}
