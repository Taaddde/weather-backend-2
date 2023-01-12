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
});
