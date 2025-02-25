import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDTO {
  @ApiProperty()
  roomName: string;

  @ApiProperty()
  theaterCode: string;
}

export class UpdateRoomDTO {
  @ApiProperty()
  roomName: string;

  @ApiProperty()
  theaterCode: string;

  @ApiProperty()
  roomActive: boolean;
}
