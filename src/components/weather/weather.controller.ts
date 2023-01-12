import { Controller, Get, Param, Req } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Location, Weather, Forecast } from 'src/models';

@Controller('v1')
export class WeatherController {
  constructor(private readonly appService: WeatherService) {}

  @Get('/location')
  async getLocation(@Req() req): Promise<Location> {
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'];
    return await this.appService.getLocation(ip);
  }

  @Get('/current/:city?')
  async getCurrent(
    @Req() req,
    @Param('city') city?: string,
  ): Promise<Weather> {
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'];
    return await this.appService.getCurrent(ip, city);
  }

  @Get('/forecast/:city?')
  async getForecast(
    @Req() req,
    @Param('city') city?: string,
  ): Promise<Forecast> {
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'];
    return await this.appService.getForecast(ip, city);
  }
}
