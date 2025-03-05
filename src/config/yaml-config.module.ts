import { Module, DynamicModule, Logger, Global } from '@nestjs/common';
import { ConfigOptions } from './types/options';
import { ConfigFactory } from './factory/config.factory';
import { EnvFactory } from './factory/env.factory';
import ConfigServiceProviderFactory from './provider/config-service.provider';

@Module({})
export class YamlConfigModule {
  static forRoot(options?: ConfigOptions): DynamicModule {
    const ConfigServiceProvider = ConfigServiceProviderFactory(options);
    return {
      global: true,
      module: YamlConfigModule,
      providers: [ConfigServiceProvider, ConfigFactory, EnvFactory, Logger],
      exports: [ConfigServiceProvider],
    };
  }

  static async forRootAsync(
    optionsPromise?: Promise<ConfigOptions>,
  ): Promise<DynamicModule> {
    const ConfigServiceProvider = ConfigServiceProviderFactory(
      await optionsPromise,
    );

    return {
      global: true,
      module: YamlConfigModule,
      providers: [ConfigServiceProvider, ConfigFactory, EnvFactory, Logger],
      exports: [ConfigServiceProvider],
    };
  }
}
