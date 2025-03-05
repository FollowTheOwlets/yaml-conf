import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { YamlConfigModule } from '~src';

describe('ConfigService Dir', () => {
  let service: ConfigService;

  beforeAll(() => {
    process.env.NODE_ENV = '';
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        YamlConfigModule.forRoot({
          filePath: 'testconfig',
        }),
      ],
      providers: [ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the correct value for a given key', () => {
    const httpHost = service.get('http.host-dir');
    expect(httpHost).toBe('127.0.0.1');

    const httpPort = service.get('http.port-dir');
    expect(httpPort).toBe(443);
  });
});
