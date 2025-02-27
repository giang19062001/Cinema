export interface IShowDateTime {
  showDateCode: string;
  st_showDateCode: string;
  movieCode: string;
  theaterCode: string;
  theaterName: string;
  dateRelease: string;
  showTimeCode: string;
  roomCode: string;
  timeRelease: string;
  timeList: IShowTime[];
}

export interface IShowTime {
  showTimeCode: string;
  roomCode: string;
  timeRelease: string;
}
