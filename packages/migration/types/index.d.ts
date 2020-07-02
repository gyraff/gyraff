import { MigrationFactoryType } from '../src/contract';
import { ApplicationErrorConstructorInterface } from '@gyraff/error';

export { MigrationInterface, MigrationFactoryType } from '../src/contract';
export { ConfigInterface } from '../src/config/contract';
export const Migration: MigrationFactoryType;
export const MigrationError: ApplicationErrorConstructorInterface;
