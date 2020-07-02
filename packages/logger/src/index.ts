import { createLogger, Logger } from 'winston';
import { ConfigInterface } from './config/contract';

export function Logger(config: ConfigInterface): Logger {
    if (!config) {
        throw new Error('Missing configuration object');
    }
    if (typeof config !== 'object') {
        throw new Error('Invalid configuration argument. Provide a valid configuration object.');
    }
    if (!config.logger) {
        throw Error(
            'Configuration object does not have logging parameters. Logging parameters should be saved under the key [logger]',
        );
    }
    return createLogger(config.logger);
}
