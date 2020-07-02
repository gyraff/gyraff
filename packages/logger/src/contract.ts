import { Logger } from 'winston';
import { ConfigInterface } from './config/contract';

export interface LoggerFactoryInterface {
    (config: ConfigInterface): Logger;
}
