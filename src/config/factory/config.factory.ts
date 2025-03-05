import { join } from 'path';
import { ConfigOptions } from '~src';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { DEFAULT_PROFILE } from './consts';

export class EnvFactory {
  static default(options: ConfigOptions, profile: string) {
    const envFilePath = join(
      __dirname,
      options.filePath,
      profile === DEFAULT_PROFILE ? '.env' : `.env.${profile}`,
    );

    const envConfig = dotenv.config({ path: envFilePath });
    return dotenvExpand.expand(envConfig);
  }
}
