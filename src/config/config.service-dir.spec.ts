import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { YamlConfigModule } from '~src';
import * as process from 'node:process';

describe('ConfigService Dev', () => {
  let service: ConfigService;

  beforeAll(() => {
    process.env.PROFILE = 'DEV';
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [YamlConfigModule.forRoot()],
      providers: [ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the correct value for a given key', () => {
    const testVar = service.get('test.var');
    expect(testVar).toBe('DEV');

    const httpHost = service.get('http.host-dev');
    expect(httpHost).toBe('localhost');

    const httpPort = service.get('http.port-dev');
    expect(httpPort).toBe(3000);
  });
});
