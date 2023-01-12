import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /v1/location', () => {
    it('Location return 200 correctly', async () => {
      const startTime = performance.now();
      const response = await request(app.getHttpServer()).get('/v1/location');
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(performance.now() - startTime).toBeLessThan(800);
    });
  });

  describe('GET /v1/current', () => {

    it('Current with city return 200 correctly', async () => {
      const startTime = performance.now();
      const response = await request(app.getHttpServer()).get('/v1/current/Montevideo');
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(performance.now() - startTime).toBeLessThan(800);
    });

    it('Current without city return 200 correctly', async () => {
      const startTime = performance.now();
      const response = await request(app.getHttpServer()).get('/v1/current');
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(performance.now() - startTime).toBeLessThan(800);
    });
  });

  describe('GET /v1/forecast', () => {

    it('Forecast with city return 200 correctly', async () => {
      const startTime = performance.now();
      const response = await request(app.getHttpServer()).get('/v1/forecast/Montevideo');
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(performance.now() - startTime).toBeLessThan(800);
    });

    it('Forecast without city return 200 correctly', async () => {
      const startTime = performance.now();
      const response = await request(app.getHttpServer()).get('/v1/forecast');
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(performance.now() - startTime).toBeLessThan(800);
    });
  });
});
