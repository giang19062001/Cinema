import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShowDateService } from '../services/showDate.service';
import { FilterShowDateDTO } from '../dto/showDate.dto';

@ApiTags('ShowDate')
@Controller('ShowDate')
export class ShowDateController {
  constructor(private readonly showDateService: ShowDateService) {}

  @Post('/dateByMovie')
  filterDateByMovie(@Body() parameter: FilterShowDateDTO) {
    return this.showDateService.filterDateByMovie(parameter);
  }
}
