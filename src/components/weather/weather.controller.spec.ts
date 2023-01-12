import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import * as dotenv from 'dotenv';
dotenv.config();

describe('AppController', () => {
  let appController: WeatherController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [WeatherService],
    }).compile();

    appController = app.get<WeatherController>(WeatherController);
  });

  describe('getLocation', () => {
    it('Correctly detects the location by ipv4', async () => {
      const response = await appController.getLocation({ip: '191.84.204.141'});
      expect(response.status).toBe('success');
    });
    it('Correctly detects the location by ipv6', async () => {
      const response = await appController.getLocation({ip: '3c92:143c:4d6b:38aa:7a70:cf79:955d:e553'});
      expect(response.status).toBe('success');
    });
    it('Failure to detect a location with the wrong ip', async () => {
      const response = await appController.getLocation({ip: 'Mi ip'});
      expect(response.status).toBe('fail');
    });
  });

  describe('getCurrent', () => {
    it('Correctly current return data with city', async () => {
      const response = await appController.getCurrent({ip: '191.84.204.141'}, 'Montevideo');
      expect(response).toHaveProperty('weather')
    });
    it('Correctly current return data without city', async () => {
      const response = await appController.getCurrent({ip: '191.84.204.141'});
      expect(response).toHaveProperty('weather')
    });
    it('Failure current with wrong city', async () => {
      const response = await appController.getCurrent({ip: '191.84.204.141'}, 'Azkaban');
      expect(response).not.toHaveProperty('weather')
    });
  });

  describe('getForecast', () => {
    it('Correctly forecast return data with city', async () => {
      const response = await appController.getForecast({ip: '191.84.204.141'}, 'Montevideo');
      expect(response.cod).toBe('200')
      expect(response.list.length).toBeGreaterThan(5);
    });
    it('Correctly forecast return data withouth city', async () => {
      const response = await appController.getForecast({ip: '191.84.204.141'});
      expect(response.cod).toBe('200')
      expect(response.list.length).toBeGreaterThan(5);
    });
    it('Failure forecast with wrong city', async () => {
      const response = await appController.getForecast({ip: '191.84.204.141'}, 'Ciudad Gótica');
      expect(response.cod).toBe('404')
      expect(response.message).toBe('city not found')
    });
  });
});
