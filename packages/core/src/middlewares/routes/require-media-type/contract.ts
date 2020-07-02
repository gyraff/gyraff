import { Middleware } from 'koa';

export type RequireMediaTypeMiddlewareType = (mediaType: string) => Middleware;
