import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const ipv4 = '191.84.204.141';
  const ipv6 = '3c92:143c:4d6b:38aa:7a70:cf79:955d:e553';
  const wrongIp = 'My ip';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /v1/location', () => {
    it('Location return 200 correctly with ipv4', async () => {
      const startTime = performance.now();
      const response = await request(app.getHttpServer()).get('/v1/location').set('x-forwarded-for', ipv4)
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(performance.now() - startTime).toBeLessThan(800);
    });
    it('Location return 200 correctly with ipv6', async () => {
      const startTime = performance.now();
      const response = await request(app.getHttpServer()).get('/v1/location').set('x-forwarded-for', ipv6)
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(performance.now() - startTime).toBeLessThan(800);
    });
    it('Location return 404 correctly with wrong ip', async () => {
      const startTime = performance.now();
      const response = await request(app.getHttpServer()).get('/v1/location').set('x-forwarded-for', wrongIp)
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(performance.now() - startTime).toBeLessThan(800);
    });
  });

  describe('GET /v1/current', () => {
    it('Current with city return 200 correctly', async () => {
      const startTime = performance.now();
      const response = await request(app.getHttpServer()).get(
        '/v1/current/Montevideo',
      ).set('x-forwarded-for', ipv4);
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(performance.now() - startTime).toBeLessThan(800);
    });

    it('Current without city return 200 correctly', async () => {
      const startTime = performance.now();
      const response = await request(app.getHttpServer()).get('/v1/current').set('x-forwarded-for', ipv4);
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(performance.now() - startTime).toBeLessThan(800);
    });
  });

  describe('GET /v1/forecast', () => {
    it('Forecast with city return 200 correctly', async () => {
      const startTime = performance.now();
      const response = await request(app.getHttpServer()).get(
        '/v1/forecast/Montevideo',
      ).set('x-forwarded-for', ipv4);
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(performance.now() - startTime).toBeLessThan(800);
    });

    it('Forecast without city return 200 correctly', async () => {
      const startTime = performance.now();
      const response = await request(app.getHttpServer()).get('/v1/forecast').set('x-forwarded-for', ipv4);
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe(
        'application/json; charset=utf-8',
      );
      expect(performance.now() - startTime).toBeLessThan(800);
    });
  });
});
