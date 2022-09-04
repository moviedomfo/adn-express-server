import ADNService, { IADNService } from "./adn.service";

export default class ServiceFactory{
 
    public static CreateIADNService():IADNService{
            return   new ADNService();
    }
}