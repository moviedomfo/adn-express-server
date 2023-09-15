import express, { Request, Response, NextFunction } from 'express';
import { ADNController } from './adn.controller';

export const adnRouter = express.Router();
const _ADNController: ADNController = new ADNController();
//_ADNController.Stats
adnRouter.post('/muitations', _ADNController.VerifyMutation);

adnRouter.get('/stats', _ADNController.GetStats);

adnRouter.get('/:id', _ADNController.GetById);

adnRouter.get('/', _ADNController.GetAll);

adnRouter.delete('/', _ADNController.Delete);
