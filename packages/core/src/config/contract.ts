import * as Logger from '@gyraff/logger';
import * as Migration from '@gyraff/migration';
import * as Connector from '@gyraff/connector';

export interface ConfigInterface extends Logger.ConfigInterface, Migration.ConfigInterface, Connector.ConfigInterface {
    env?: string;
    port?: number;
    baseDir: string;
}
