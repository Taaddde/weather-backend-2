import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
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
});
