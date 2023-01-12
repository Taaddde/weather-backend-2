import { Module } from '@nestjs/common';
import { WeatherModule } from './components';

@Module({
  imports: [WeatherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
