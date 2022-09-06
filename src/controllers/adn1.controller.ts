
// import { TYPES } from "../common/types";
// import { Request, Response, NextFunction } from "express";
// import { IMutationDto } from "models/MutationDto";
// import { IADNService } from "../services/adn.service";
// import ServiceFactory from "../services/ServiceFactory";
// import {  inject } from "inversify";
// import { IDNASchema } from "models/adn.schema";
// import { IStatsDto } from "models/StatsDto";

// const adnService = ServiceFactory.CreateIADNService();

// export interface IADNController{
//    Mutation (req: Request, res: Response, next: NextFunction);
//    GetById(req: Request, res: Response, next: NextFunction);
//    GetAll(req: Request, res: Response, next: NextFunction);
//    ClearAll(req: Request, res: Response, next: NextFunction);
//    Stats(req: Request, res: Response, next: NextFunction); 
// }


// export default class ADNController1 implements IADNController{
//   adnService: IADNService;

//   constructor(@inject(TYPES.ADNService) adnService: IADNService) {

//       this.adnService = adnService;
//   }
  
//    async Mutation(req: Request, res: Response, next: NextFunction) {
//     try {
//       const mutationDTO: IMutationDto = req.body as IMutationDto;
//       const result = await adnService.Mutation(mutationDTO);
//       if (result) res.status(200).send();
//       else res.status(403).send();
//     } catch (e) {
//       next(e);
//     }
//   }

//   async Stats(req: Request, res: Response, next: NextFunction) {
//     try {
//       const result = await adnService.Stats();
//       res.status(200).send(result);
//     } catch (e) {
//       next(e);
//     }
//   }


//   async GetAll(req: Request, res: Response, next: NextFunction) {
//     try {
//       const result = await adnService.GetAll();

//       if (result) res.status(200).send(result);
//       else res.status(204).send();
//     } catch (e) {
//       next(e);
//     }
//   }

//   async GetById(req: Request, res: Response, next: NextFunction) {
//     try {
//       const id =  req.params.id;
//       const result = await adnService.GetById(id);

//       if (result) res.status(200).send(result);
//       else res.status(204).send();
//     } catch (e) {
//       next(e);
//     }
//   }

//   async ClearAll(req: Request, res: Response, next: NextFunction) {
//     try {
      
//       const result = await adnService.ClearAll();
//        res.status(200).send(true);
//     } catch (e) {
//       next(e);
//     }
//   }
// }
