import { ApiProperty } from '@nestjs/swagger';

export class FilterShowDateDTO {
  @ApiProperty()
  movieCode: string;

  @ApiProperty()
  date: string;
}
