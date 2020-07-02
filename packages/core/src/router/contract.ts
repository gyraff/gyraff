import * as Application from 'koa';

export interface RouterInterface {
    init(app: Application, dir: string): Promise<void>;
}
