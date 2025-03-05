import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigModule as BaseConfigModule,
  ConfigService,
} from '@nestjs/config';
import configuration from './common/configuration';
import { ConfigOptions } from './types/options';

@Module({})
export class ConfigModule {
  static forRoot(options: ConfigOptions): DynamicModule {
    return {
      module: ConfigModule,
      imports: [BaseConfigModule.forFeature(() => configuration(options))],
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
