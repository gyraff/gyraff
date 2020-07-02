import { Server } from 'http';
import * as Application from 'koa';

export interface BootstrapInterface {
    http: () => Promise<{
        app: Application;
        server: Server;
    }>;
    testing: () => void;
}

export interface BootstrapFactoryInterface {
    (): BootstrapInterface;
}
