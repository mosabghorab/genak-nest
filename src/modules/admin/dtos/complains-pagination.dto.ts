import { Expose, Type } from 'class-transformer';
import { ComplainDto } from '../../shared/dtos/complain.dto';

export class ComplainsPaginationDto {
  @Expose()
  perPage: number;

  @Expose()
  currentPage: number;

  @Expose()
  lastPage: number;

  @Expose()
  total: number;

  @Expose()
  @Type(() => ComplainDto)
  data: ComplainDto[];
}
