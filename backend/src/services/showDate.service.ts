/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TheaterRepository } from '../repository/theater.repository';
import { FilterShowDateDTO } from '../dto/showDate.dto';
import { ShowDateRepository } from '../repository/showDate.repository';
import { ShowDate } from '../entities/showDate.entity';
import { IShowDateTime } from '../interface/showDateTime';
import { Theater } from '../entities/theater.entity';

@Injectable()
export class ShowDateService {
  constructor(
    @InjectRepository(ShowDateRepository)
    private readonly showDateRepository: ShowDateRepository,
    @InjectRepository(TheaterRepository)
    private readonly theaterRepository: TheaterRepository,
  ) {}

  async filterDateByMovie(parameter: FilterShowDateDTO): Promise<any[]> {
    const dateTimeMovieRows = await this.showDateRepository
      .createQueryBuilder('sd')
      .leftJoin('show_time', 'st', 'st.showDateCode = sd.showDateCode')
      .leftJoin('theater', 'th', 'th.theaterCode = sd.theaterCode')
      .select([
        'sd.showDateCode as showDateCode',
        'sd.movieCode as movieCode',
        'sd.theaterCode as theaterCode',
        'sd.dateRelease as dateRelease',
        'st.showTimeCode as showTimeCode',
        'st.showDateCode',
        'st.roomCode as roomCode',
        'st.timeRelease as timeRelease',
        'th.theaterName as theaterName',
      ])
      .where('sd.movieCode = :movieCode AND sd.dateRelease = :date', {
        movieCode: parameter.movieCode,
        date: parameter.date,
      })
      .getRawMany();

    // GROUP TIME TO DATE
    const dateTimeMovie = dateTimeMovieRows.reduce(
      (acc, dateTime: IShowDateTime) => {
        const existingDateTime = acc.find(
          (dt: ShowDate) => dt.showDateCode === dateTime.st_showDateCode,
        );
        if (existingDateTime) {
          existingDateTime.timeList.push({
            showTimeCode: dateTime.showTimeCode,
            roomCode: dateTime.roomCode,
            timeRelease: dateTime.timeRelease,
          });
        } else {
          const {
            showTimeCode,
            st_showDateCode,
            roomCode,
            timeRelease,
            ...restDateTime
          } = dateTime;
          acc.push({
            ...restDateTime,
            timeList: dateTime.showTimeCode
              ? [
                  {
                    showTimeCode: dateTime.showTimeCode,
                    roomCode: dateTime.roomCode,
                    timeRelease: dateTime.timeRelease,
                  },
                ]
              : [],
          });
        }
        return acc;
      },
      [],
    );

    // MERGE DATE_TIME TO THEATER
    const theaters = await this.theaterRepository
      .createQueryBuilder('th')
      .select(['theaterCode', 'theaterName'])
      .getRawMany();

    const mergedList = theaters.map((theater: Theater) => {
      const dateTime = dateTimeMovie.find(
        (sd: Theater) => sd.theaterCode === theater.theaterCode,
      ) || {
        movieCode: parameter.movieCode,
        dateRelease: parameter.date,
        showDateCode: null,
        timeList: [],
      };

      return { ...theater, ...dateTime };
    });

    return mergedList;
  }
}
