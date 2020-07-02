import { ConfigInterface } from '../src/config/contract';
import { Logger } from 'winston';

export { LoggerFactoryInterface } from '../src/contract';
export { ConfigInterface } from '../src/config/contract';
export function Logger(config: ConfigInterface): Logger;
