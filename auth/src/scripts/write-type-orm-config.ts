import { configService } from '../config/config.service';
import fs from 'fs';
import path from 'path';

fs.writeFileSync(
  path.resolve(__dirname, '..', '..', 'ormconfig.json'),
  JSON.stringify(configService.geTypeOrmConfig(), null, 2),
);
