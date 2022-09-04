//inversify container Where which there is some coupling. In the rest of your application your classes should be free of references to other classes.

import { Container } from "inversify";
import { TYPES } from "./types";
import ADNService, { IADNService } from "../services/adn.service";

const container  = new Container();
container.bind<IADNService>(TYPES.ADNService).to(ADNService);
// myContainer.bind<Weapon>(TYPES.Weapon).to(Katana); sample


export default  container ;