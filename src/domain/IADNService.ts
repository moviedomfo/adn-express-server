import { IDNASchema } from './../infra/schemas/adn.schema';
import { ValidateMutationDto, IStatsDto,AdnDto } from './dto';

export interface IADNService {
  MutationVerify: (req: ValidateMutationDto) => Promise<boolean>;
  GetById: (id: string) => Promise<AdnDto>;
  GetAll: () => Promise<AdnDto[]>;
  Stats: () => Promise<IStatsDto>;
  ClearAll: () => Promise<void>;
}
