import { gyraff } from '../../index';

export async function application() {
    await gyraff(`${__dirname}/src/config`);
}

// application();