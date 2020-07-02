import { ConfigInterface } from '../contract';

export interface ApplicationConfigInterface extends Partial<ConfigInterface> {
    baseDir: string;
}
