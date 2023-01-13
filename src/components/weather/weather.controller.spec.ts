import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import * as dotenv from 'dotenv';
dotenv.config();

describe('WeatherController', () => {
  let appController: WeatherController;
  const ipv4 = '191.84.204.141';
  const ipv6 = '3c92:143c:4d6b:38aa:7a70:cf79:955d:e553';
  const wrongIp = 'My ip';
  const city = 'Montevideo';
  const wrongCity = 'Azkaban';
  const headers = { 'x-forwarded-for': ipv4 };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [WeatherService],
    }).compile();

    appController = app.get<WeatherController>(WeatherController);
  });

  describe('getLocation', () => {
    it('Successful detection of location by ipv4', async () => {
      const response = await appController.getLocation({ headers });
      expect(response.status).toBe('success');
      expect(response).toHaveProperty('lat');
      expect(response).toHaveProperty('lon');
      expect(response).toHaveProperty('city');
      expect(response).toHaveProperty('region');
      expect(response).toHaveProperty('country');
      expect(response).toHaveProperty('countryCode');
    });
    it('Successful detection of location by ipv6', async () => {
      const response = await appController.getLocation({
        headers: { 'x-forwarded-for': ipv6 },
      });
      expect(response.status).toBe('success');
      expect(response).toHaveProperty('lat');
      expect(response).toHaveProperty('lon');
      expect(response).toHaveProperty('city');
      expect(response).toHaveProperty('region');
      expect(response).toHaveProperty('country');
      expect(response).toHaveProperty('countryCode');
    });
    it('Failure to detect a location with the wrong ip', async () => {
      const response = await appController.getLocation({
        headers: { 'x-forwarded-for': wrongIp },
      });
      expect(response.status).toBe('fail');
      expect(response.message).toBe('invalid query');
    });
  });

  describe('getCurrent', () => {
    it('Correctly returns current data with city', async () => {
      const response = await appController.getCurrent({ headers }, city);
      expect(response.cod).toBe(200);
      expect(response).toHaveProperty('weather');
      expect(response).toHaveProperty('name');
      expect(response).toHaveProperty('main');
      expect(response).toHaveProperty('wind');
      expect(response).toHaveProperty('coord');
    });
    it('Correctly returns current data without city', async () => {
      const response = await appController.getCurrent({ headers });
      expect(response.cod).toBe(200);
      expect(response).toHaveProperty('weather');
      expect(response).toHaveProperty('name');
      expect(response).toHaveProperty('main');
      expect(response).toHaveProperty('wind');
      expect(response).toHaveProperty('coord');
    });
    it('Failure to return current data with wrong city', async () => {
      const response = await appController.getCurrent({ headers }, wrongCity);
      expect(response).not.toHaveProperty('weather');
      expect(response.cod).toBe('404');
      expect(response.message).toBe('city not found');
    });
  });

  describe('getForecast', () => {
    it('Correctly returns forecast data with city', async () => {
      const response = await appController.getForecast({ headers }, city);
      expect(response.cod).toBe('200');
      expect(response.list.length).toBeGreaterThan(5);
      expect(response).toHaveProperty('city');
    });
    it('Correctly returns forecast data withouth city', async () => {
      const response = await appController.getForecast({ headers });
      expect(response.cod).toBe('200');
      expect(response.list.length).toBeGreaterThan(5);
      expect(response).toHaveProperty('city');
    });
    it('Failure to return forecast data with wrong city', async () => {
      const response = await appController.getForecast({ headers }, wrongCity);
      expect(response.cod).toBe('404');
      expect(response).not.toHaveProperty('city');
      expect(response.message).toBe('city not found');
    });
  });
});
