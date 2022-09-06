
import {NextFunction, Request,Response} from 'express';
import { IMutationDto } from "models/MutationDto";
import  IADNService  from "../services/adn.service";

export default class ADN2Controller {
  adnService: IADNService ;
  
  constructor(adnService: IADNService ) {
    this.adnService = adnService;

  }


  public async Mutation( req: Request, res: Response, next: NextFunction) {
    try {
      const mutationDTO: IMutationDto = req.body as IMutationDto;
      const result = await this.adnService.Mutation(mutationDTO);
      if (result) res.status(200).send();
      else res.status(403).send();
    } catch (e) {
      next(e);
    }
  }

 
  public async Stats( req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.adnService.Stats();
      res.status(200).send(result);
    } catch (e) {
      next(e);
    }
  }

 
  public async GetAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.adnService.GetAll();

      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  }

  public async GetById( req: Request, res: Response, next: NextFunction) {
    try {
      const id =  req.params.id;
      const result = await this.adnService.GetById(id);

      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  }

  public async ClearAll(  req: Request, res: Response, next: NextFunction) {
    try {
      
      const result = await this.adnService.ClearAll();
       res.status(200).send(true);
    } catch (e) {
      next(e);
    }
  }
}

export interface IADNController{
   Mutation (  req: Request, res: Response, next: NextFunction);
   GetById( req: Request, res: Response, next: NextFunction);
   GetAll( req: Request, res: Response, next: NextFunction);
   ClearAll(req: Request, res: Response, next: NextFunction);
   Stats( req: Request, res: Response, next: NextFunction); 
}
