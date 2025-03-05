import { ConfigOptions } from '~src';
import { EnvFactory } from '../factory/env.factory';
import * as process from 'node:process';
import { ConfigFactory } from '../factory/config.factory';
import { join } from 'path';
import { DEFAULT_PROFILE } from '../common/const';
import { ConfigService } from '@nestjs/config';

const getConfiguration = (
  configFactory: ConfigFactory,
  envFactory: EnvFactory,
  options?: ConfigOptions,
) => {
  const profile = process.env.NODE_ENV || DEFAULT_PROFILE;
  const dirname =
    options && options.filePath
      ? join(process.cwd(), options.filePath)
      : process.cwd();

  envFactory.create(profile, dirname);
  return new ConfigService(configFactory.create(dirname));
};

export default (options?: ConfigOptions) => ({
  provide: ConfigService,
  useFactory: (configFactory: ConfigFactory, envFactory: EnvFactory) =>
    getConfiguration(configFactory, envFactory, options),
  inject: [ConfigFactory, EnvFactory],
});
