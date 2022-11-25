import { DirectorResponseDto } from './director-response-dto';
import { SpeciesResponseDto } from './species-response-dto';

export class GoodResponseDto {
  id: number;
  title: string;
  director: DirectorResponseDto[];
  createdAt: string;
  species: SpeciesResponseDto[]
}
