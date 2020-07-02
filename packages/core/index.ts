import { injector } from '@gyraff/injector';
import { setup } from './setup';

export async function gyraff(configDir: string): Promise<void> {
    await setup(configDir);
    const bootstrap = injector.get('Bootstrap')();
    const config = injector.get('config');
    const { env, port } = config;
    if (env !== 'test') {
        const { server } = await bootstrap.http();
        const logger = injector.get('logger');
        server.listen(port, () => {
            logger.info(`App running on port ${port}...`);
        });
    } else {
        await bootstrap.testing();
    }
}

process.on('unhandledRejection', (error) => {
    // eslint-disable-next-line no-console
    console.log('unhandledRejection', error);
    process.exit(1);
});
