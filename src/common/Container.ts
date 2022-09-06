
import {
    createContainer,
    asValue,
    asFunction,
    asClass,
    InjectionMode,
  } from 'awilix';
import ADNController from '../controllers/adn2.controller';
import ADNService, { IADNService } from "../services/adn.service";





const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });
  
  container.register({
    adnService: asClass(ADNService).scoped(),
     adnController : asClass(ADNController).scoped()
  });
  
  export default container;


