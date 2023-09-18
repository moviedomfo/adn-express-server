import { IADNRepository } from '../app/IADN.repo';
import { ValidateMutationDto } from '../domain/dto/ValidateMutationDto';
import DNASchema, { IDNASchema } from '../infra/schemas/adn.schema';

export default class ADNMongoRepository implements IADNRepository {
  public Create = async (
    validateMutationDto: ValidateMutationDto,
    hasMutation: boolean
  ): Promise<void> => {
    return new Promise<void>(() => {
      const dna = new DNASchema({
       
        dna: validateMutationDto.dna.join(),
        hasMutation,
      });

      dna.save();
    });
  };

  Count = async (hasMutation: boolean): Promise<number> => {
    const count_mutations = await DNASchema.collection.countDocuments({
      hasMutation,
    });

    return count_mutations;

    // return new Promise<number>(async (resolve) => {
    //   const count_mutations = await DNASchema.collection.countDocuments({
    //     hasMutation,
    //   });

    //   resolve(count_mutations)
    // });
  };

  public GetById = async (id: string): Promise<IDNASchema> => {
    // return new Promise<IDNASchema>((resolve, reject) => {
    //   const res = DNASchema.findById(id);

    //   resolve(res);
    // });
    const res = DNASchema.findById(id);

    return res;
  };

  public GetAll = async (): Promise<IDNASchema[]> => {
    // return new Promise<IDNASchema[]>((resolve, reject) => {
    //   const res = DNASchema.find();

    //   resolve(res);
    // });
    const res = DNASchema.find();
    return res;
  };

  public ClearAll = async (): Promise<void> => {
    DNASchema.collection.deleteMany({});
  };

  // public ClearAll = async (): Promise<void> => {
  //   await DNASchema.collection.deleteMany({});
  // };
}
