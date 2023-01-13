import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { LoggerInterceptor } from '../../interceptors';

@Module({
  imports: [],
  controllers: [WeatherController],
  providers: [WeatherService, LoggerInterceptor],
})
export class WeatherModule {}
