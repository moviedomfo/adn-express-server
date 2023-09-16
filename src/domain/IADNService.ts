import { IDNASchema } from './../infra/schemas/adn.schema';
import { ValidateMutationDto, IStatsDto } from './dto';

export interface IADNService {
  MutationVerify: (req: ValidateMutationDto) => Promise<boolean>;
  GetById: (id: string) => Promise<IDNASchema>;
  GetAll: () => Promise<IDNASchema[]>;
  Stats: () => Promise<IStatsDto>;
  ClearAll: () => Promise<void>;
}
