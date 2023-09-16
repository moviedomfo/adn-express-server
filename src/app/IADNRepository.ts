import { IDNASchema } from './../infra/schemas/adn.schema';
import { ValidateMutationDto,IStatsDto } from './../domain/dto';


export interface IADNRepository {
  Create: (validateMutationDto: ValidateMutationDto,hasMutation:boolean) => Promise<void>;
  GetById: (Id: string) => Promise<IDNASchema>;
  GetAll: () => Promise<IDNASchema[]>;
  Count : (hasMutation:boolean) => Promise<number>;
  ClearAll : () => Promise<void>;
}
