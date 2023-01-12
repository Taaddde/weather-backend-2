import { Injectable } from '@nestjs/common';
import { Forecast, Location, Weather } from './models';

@Injectable()
export class AppService {
  async getLocation(ip: string): Promise<Location> {
    const response = await fetch(`http://ip-api.com/json/${ip}`)
    const data = await response.json()

    return data;
  }

  async getCurrent(ip: string, city?: string): Promise<Weather> {
    let url = '';
    if (city) {
      url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_KEY}&units=metric`
    } else {
      const response = await fetch(`http://ip-api.com/json/${ip}`)
      const {lat, lon} = await response.json()
  
      url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}&units=metric`
    }

    const response = await fetch(url)
    const data = await response.json()

    return data
  }

  async getForecast(ip: string, city?: string): Promise<Forecast> {
    let url = '';
    if (city) {
      url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHER_KEY}&units=metric`;
    } else {
      const response = await fetch(`http://ip-api.com/json/${ip}`)
      const {lat, lon} = await response.json()
  
      url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}&units=metric`;
    }

    const response = await fetch(url)
    const data = await response.json()

    return data
  }
}
