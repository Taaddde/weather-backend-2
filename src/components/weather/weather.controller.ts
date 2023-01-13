import { Controller, Get, NotFoundException, Param, Req, UseInterceptors } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Location, Weather, Forecast } from 'src/models';
import { LoggerInterceptor } from '../../interceptors';

@Controller('v1')
@UseInterceptors(LoggerInterceptor)
export class WeatherController {
  constructor(private readonly appService: WeatherService) {}

  @Get('/location')
  async getLocation(@Req() req): Promise<Location> {
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'];
    const location = await this.appService.getLocation(ip);

    if (location.status === 'fail') {
      throw new NotFoundException(location);
    } else {
      return location;
    }
  }

  @Get('/current/:city?')
  async getCurrent(@Req() req, @Param('city') city?: string): Promise<Weather> {
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'];
    const current = await this.appService.getCurrent(ip, city);

    if (current.cod === '404') {
      throw new NotFoundException(current);
    } else {
      return current;
    }
  }

  @Get('/forecast/:city?')
  async getForecast(
    @Req() req,
    @Param('city') city?: string,
  ): Promise<Forecast> {
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'];
    const forecast = await this.appService.getForecast(ip, city);

    if (forecast.cod === '404') {
      throw new NotFoundException(forecast);
    } else {
      return forecast;
    }
    return;
  }
}
