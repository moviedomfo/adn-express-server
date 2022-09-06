import { IMutationDto } from "../models/MutationDto";
import  IADNService  from "../services/adn.service";
// import { DELETE, GET, POST, route } from "awilix-express";
import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller, Request, Response,Delete } from 'tsoa';


@Route('adn')
export default class adnController  extends Controller{
  adnService: IADNService ;
  
  constructor(adnService: IADNService ) {
    super();

    this.adnService = adnService;

  }

  
  @SuccessResponse("201", "Created")
  @Post()
  public async Mutation( @Body() req: IMutationDto) {
    
      const result = await this.adnService.Mutation(req);
      if (result)  this.setStatus(200);  
      else  this.setStatus(403); 
    
  }

  @Get('/stats')
  public async Stats(  ) {
    
      const result = await this.adnService.Stats();
      this.setStatus(200);  
  }

  @Get()
  public async GetAll(  ) {
    
    console.log('.-------------------------get alll....................');
      const result = await this.adnService.GetAll();

      if (result) this.setStatus(200);  
      else this.setStatus(204);  
   
  }

   @Get('{id}')
  public async GetById( @Path() id: string ) {

    //const id =  req.params.id;
      const result = await this.adnService.GetById(id);

      if (result) this.setStatus(200);  
      else this.setStatus(204);  
  }

  @Delete()
  public async ClearAll(  ) {
    
      
       await this.adnService.ClearAll();
       this.setStatus(200);  
      
  }
}
