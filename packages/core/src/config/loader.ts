import { merge } from 'lodash';
import { access } from 'fs';
import { ApplicationConfigInterface } from './application/contract';

const exists = async (dir: string): Promise<boolean> => {
    return new Promise((resolve) => {
        access(dir, (err) => {
            if (err) resolve(false);
            else resolve(true);
        });
    });
};

export async function loader(dir: string): Promise<ApplicationConfigInterface> {
    const dirExists = await exists(dir);
    if (!dirExists) {
        throw new Error(`Can not access directory ${dir}. Make sure to provide a working directory.`);
    }

    // Current environment
    const env = process.env.NODE_ENV || 'development';

    // Default config
    let defaultConfig = {};
    try {
        const dc = await import(`${dir}/default`);
        defaultConfig = dc.config || {};
    } catch (e) {
        throw new Error(`An error occurred while loading your application default config file: ${e.message}`);
    }

    // Environment config
    let envConfig = {};
    try {
        const ec = await import(`${dir}/${env}`);
        envConfig = ec.config || {};
    } catch (e) {}

    // Local environment config
    let envConfigLocal = {};
    try {
        const ecl = await import(`${dir}/${env}.local`);
        envConfigLocal = ecl.config || {};
    } catch (e) {}

    // application config
    return merge({}, defaultConfig, envConfig, envConfigLocal) as ApplicationConfigInterface;
}
