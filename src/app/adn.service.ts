import { AdnDto } from './../domain/dto/AdnDTO';
import { AppError } from './../../dist/common/http-exception';
import { IDNASchema } from './../infra/schemas/adn.schema';
import { IStatsDto } from './../domain/dto/GetStatsDto';
import { ValidateMutationDto } from './../domain/dto/ValidateMutationDto';
import { AppConstants } from '../common/CommonConstants';
import { IADNService } from '../domain/IADNService';
import { IADNRepository } from './IADN.repo';

export class ADNService implements IADNService {
  constructor(private readonly adnRepo: IADNRepository) {}

  public MutationVerify = async (
    req: ValidateMutationDto
  ): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      validateMatrixFormat(req.dna);
      const adnMatrix = createMatriz(req.dna);

      let hasMutation = hasHoizontalMutation(adnMatrix);
      if (!hasMutation) hasMutation = hasVerticalMutation(adnMatrix);
      if (!hasMutation) hasMutation = validateDiagonal(adnMatrix);

      this.adnRepo.Create(req, hasMutation);

      resolve(hasMutation);
    });
  };

  public GetById = async (id: string): Promise<AdnDto> => {
    return new Promise<AdnDto>(async (resolve, reject) => {
      const res = await this.adnRepo.GetById(id);

      const adn = {
        id: res._id,
        dna: res.dna,
        hasMutation: res.hasMutation,
        date: new Date(res.createdAt),
      };

      resolve(adn);
    });
  };

  public GetAll = async (): Promise<AdnDto[]> => {
    return new Promise<AdnDto[]>(async (resolve, reject) => {
      const res = await this.adnRepo.GetAll();
      const adnList = res.map(
        (adnData) =>
          <AdnDto>{
            id: adnData._id,
            dna: adnData.dna,
            hasMutation: adnData.hasMutation,
            date: new Date(adnData.createdAt),
          }
      );
      resolve(adnList);
    });
  };

  public Stats = async (): Promise<IStatsDto> => {
    return new Promise<IStatsDto>(async (resolve, _reject) => {
      const count_mutations = await this.adnRepo.Count(true);
      const count_no_mutation = await this.adnRepo.Count(false);

      const ratio =
        count_no_mutation !== 0 ? count_mutations / count_no_mutation : 0;

      const stats: IStatsDto = {
        count_mutations,
        count_no_mutation,
        ratio: ratio,
      };
      resolve(stats);
    });
  };

  public ClearAll = async (): Promise<void> => {
    await this.adnRepo.ClearAll();
  };
}

/**
 * Validate mutation on principal diamatrix diagonal . When i=j
 * @params {string[][]} The ADN string converted to Matrix NxN
 * @return boolean : hasMutation= true
 */
function hasHoizontalMutation(matrix: string[][]): boolean {
  //let hasMutation = false;
  const regex = new RegExp(AppConstants.R_EXP_MORE_THAN_4CHAR_CONTINUOS, 'gi');

  for (let j = 0; j < matrix.length; j++) {
    let trozo = matrix[j].join('');
    const isMath = regex.exec(trozo);

    if (isMath) return true; //short circuit

    // if(isMath)
    // {
    //   hasMutation= true;
    //   console.log(`Mutacion in row ${j} ` + trozo)
    // }
    // else
    // {
    //   console.log('Ok --> ' + trozo);
    // }
  }
  return false;
}

/**
 * Validate mutation on principal diamatrix diagonal . When i=j
 * @params {string[][]} The ADN string converted to Matrix NxN
 * @return boolean : hasMutation= true
 */
function hasVerticalMutation(matrix: string[][]) {
  //let hasMutation = false;

  const regex = new RegExp(AppConstants.R_EXP_MORE_THAN_4CHAR_CONTINUOS, 'gi');
  for (let j = 0; j < matrix.length; j++) {
    let colArray = new Array();
    for (let i = 0; i < matrix.length; i++) {
      colArray.push(matrix[i][j]);
    }
    let partialAdnString = colArray.join('');

    const isMath = regex.exec(partialAdnString);

    if (isMath) return true; //short circuit

    // uncomment only for logs and detect all mutated strings
    // if (isMath) {
    //   hasMutation = true;
    //   console.log(`Mutacion --> in col ${j} ` + partialAdnString);
    // } else {
    //   console.log("Ok --> " + partialAdnString);
    // }
  }
  return false;
}

/**
 * Validate mutation on principal diamatrix diagonal . When i=j
 * @params {string[][]} The ADN string converted to Matrix NxN
 * @return boolean : hasMutation= true
 */
function validateDiagonal(matrix: string[][]): boolean {
  const regex = new RegExp(AppConstants.R_EXP_MORE_THAN_4CHAR_CONTINUOS, 'gi');

  const n: number = matrix[0].length;
  let diag = new Array(n);

  // create string with diagonal  to be validated
  for (let i = 0; i < n; i++) {
    diag[i] = matrix[i][i];
  }
  const isMath = regex.exec(diag.join());

  return isMath ? true : false;

  // uncomment only for logs and detect all mutated strings

  // if(isMath)
  // {
  //   console.log(`Mutacion in diagonal  --> `  + diag.join())
  // } else
  // {
  //   console.log('diagonal Ok --> ' + diag.join());
  // }
  //return false;
}

/**
 * Chek if all rows contains the same number of characters
 *
 * @params {string[]} The original unidirectional array called ADN string.
 * @return This method not return true or false. Simply throw an Exception if error
 */
function validateMatrixFormat(adn: string[]): void {
  if (adn.length == 0) throw Error('ADN must nop be empty');

  //Detect a square matrix ( the same number of rows and columns)
  //Number of cols "n"
  let n: number = adn[0].length;
  // Number of rows "m"
  let m: number = adn.length;

  // if it is not square reject
  if (m !== m)
    throw new AppError(
      400,
      `ADN number of columns ${n} are not equals to rows ${m}`
    );

  //Chek if all rows contains the same number of characters.
  // I'm using do-while only for code variations
  let i = 0;
  do {
    if (adn[i].length !== n) {
      throw new AppError(400, `Not all cols are equals`);
    }
    i++;
  } while (i < adn.length);
}

/**
 * Create bidimentional Matrix NxN with ADN string. Previously check theirs characters
 * @remarks
 * This method  not return true or false. Simply throw an Exception if error
 * @params {string[]} The original unidirectional array called ADN string.
 */
function createMatriz(dna: string[]): string[][] {
  let n: number = dna.length;
  let adnMatrix = new Array(dna.length);
  for (let i = 0; i < n; i++) {
    let row = Array.from(dna[i]);
    adnMatrix[i] = row;
  }
  chekCharacters(adnMatrix);
  // uncoment if you need logs to test
  //console.table(adnMatrix);
  return adnMatrix;
}

/**
 * Validates if  each of the characters of the string if  within the the allowed ones >-'A','T','C','G'
 * @remarks
 * This method not return true or false. Simply throw an Exception if error
 * @params {string[][]} The ADN string converted to Matrix NxN
 */
function chekCharacters(matrix: string[][]) {
  const allowebChars = ['A', 'T', 'C', 'G'];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (!allowebChars.includes(matrix[i][j])) {
        throw new AppError(
          400,
          `The character ${matrix[i][j]} is not allowed. pleasse check char ${[
            j + 1,
          ]} in line ${i + 1} `
        );
      }
    }
  }
}
