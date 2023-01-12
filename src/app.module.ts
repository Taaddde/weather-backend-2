import { Module } from '@nestjs/common';
import { WeatherModule } from './components/weather/weather.module';

@Module({
  imports: [WeatherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
