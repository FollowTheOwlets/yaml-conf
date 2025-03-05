import { join } from 'path';
import { APP_CONFIG_FILE} from '../common/const';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import * as ejs from 'ejs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigFactory {
  constructor(@Inject() private readonly logger: Logger) {}

  create(dirname: string) {
    try {
      const configFilePath = join(dirname, APP_CONFIG_FILE);
      const configTemplate = readFileSync(configFilePath, 'utf8');
      const configString = ejs.render(configTemplate);
      return yaml.load(configString) as ConfigService;
    } catch (e) {
      this.logger.error('Error creating config file', e);
    }
  }
}
