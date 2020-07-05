import * as fs from 'fs';
import * as path from 'path';

export const privateKey = fs.readFileSync(
  path.resolve(__dirname, '..', '..', '..','.ssh/jwtRS256.key'),
  'utf-8',
);

export const publicKey = fs.readFileSync(
  path.resolve(__dirname, '..', '..', '..','.ssh/jwtRS256.key.pub'),
  'utf-8',
);
