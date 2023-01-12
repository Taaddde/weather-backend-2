import { Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Location, Weather, Forecast } from './models';

@Controller('v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/location')
  async getLocation(
    @Req() request
  ): Promise<Location> {
    const {ip} = request;
    return await this.appService.getLocation(ip);
  }

  @Get('/current/:city?')
  async getCurrent(
    @Req() request,
    @Param('city') city?:string
  ): Promise<Weather> {
    const {ip} = request;
    return await this.appService.getCurrent(ip, city);
  }

  @Get('/forecast/:city?')
  async getForecast(
    @Req() request,
    @Param('city') city?:string
  ): Promise<Forecast> {
    const {ip} = request;
    return await this.appService.getForecast(ip, city);
  }
}
