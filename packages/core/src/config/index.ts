import { merge } from 'lodash';
import { ApplicationConfigInterface } from './application/contract';
import { defaultConfig } from './default';

export function $config(applicationConfig: ApplicationConfigInterface): ApplicationConfigInterface {
    return merge({}, defaultConfig, applicationConfig) as ApplicationConfigInterface;
}
