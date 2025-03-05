import { join } from 'path';
import * as dotenv from 'dotenv';
import {
  DEFAULT_PROFILE,
  DOT_ENV_FILE,
  DOT_ENV_FILE_LOCAL_PREFIX,
} from '../common/const';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EnvFactory {
  constructor(@Inject() private readonly logger: Logger) {}

  create(profile: string, dirname: string) {
    try {
      const envFiles: string[] = [];

      if (profile !== DEFAULT_PROFILE) {
        envFiles.push(
          `${DOT_ENV_FILE}.${profile.toLowerCase()}${DOT_ENV_FILE_LOCAL_PREFIX}`,
          `${DOT_ENV_FILE}.${profile.toLowerCase()}`,
        );
      }

      envFiles.push(
        `${DOT_ENV_FILE}${DOT_ENV_FILE_LOCAL_PREFIX}`,
        `${DOT_ENV_FILE}`,
      );

      envFiles.forEach((file) => {
        const envFilePath = join(dirname, file);
        dotenv.config({ path: envFilePath });
      });
    } catch (e) {
      this.logger.error('Error reading .env files', e);
    }
  }
}
