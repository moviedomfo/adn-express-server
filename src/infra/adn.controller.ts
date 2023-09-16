import { ValidateMutationDto } from './../domain/dto/ValidateMutationDto';
import { Request, Response, NextFunction } from 'express';
import ADNMongoRepository from './adn.repo';
import { ADNService, IADNRepository } from '../app';

export class ADNController {
  private adnRepo: IADNRepository;
  private readonly adnService: ADNService;
  constructor() {
    this.adnRepo = new ADNMongoRepository();
    this.adnService = new ADNService(this.adnRepo);
  }

  public VerifyMutation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body: ValidateMutationDto = req.body as ValidateMutationDto;

      const result = await this.adnService.MutationVerify(body);
      if (result) res.status(200).send(true);
      else res.status(403).send();
    } catch (e) {
      next(e);
    }
  };

  public GetStats = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.adnService.Stats();

      res.status(200).send(result);
    } catch (e) {
      next(e);
    }
  };

  public GetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      const result = await this.adnService.GetById(id);
      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  };

  public GetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.adnService.GetAll();

      if (result) res.status(200).send(result);
      else res.status(204).send();
    } catch (e) {
      next(e);
    }
  };

  public Delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.adnService.ClearAll();

      res.status(200).send(true);
    } catch (e) {
      next(e);
    }
  };
}
