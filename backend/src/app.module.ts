import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './modules/movide.module';
import { CategoryModule } from './modules/category.module';
import { TheaterModule } from './modules/theater.module';
import { FoodModule } from './modules/food.module';
import { MovieCategoryModule } from './modules/movieCategory.module';
import { RoomModule } from './modules/room.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'giang19062001',
      database: 'cinema',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: ['src/migrations/**/*.{ts,js}'],
      synchronize: true,
      autoLoadEntities: true,
      // logging: true,
    }),
    MovieModule,
    CategoryModule,
    MovieCategoryModule,
    FoodModule,
    TheaterModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
