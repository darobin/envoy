
import { homedir } from 'os';
import { join } from 'path';

export const dataDir = join(homedir(), '.envoyager');
export const identitiesDir = join(dataDir, 'identities');

export function did2keyDir (did) {
  return join(identitiesDir, encodeURIComponent(did), 'keys');
}
