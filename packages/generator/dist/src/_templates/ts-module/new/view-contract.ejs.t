---
to: <%if (!locals.skipView) { %><%= outDir  %>/src/views/<%= namePluralDashed %>/contract.ts<%}%>
unless_exists: true
---
import { ViewFactoryType, ViewInterface } from '@gyraff/core';

export interface <%= namePluralCamelized %>ViewInterface extends ViewInterface {
    index(data: { [p: string]: any }): void
}

export type <%= namePluralCamelized %>ViewFactoryType = ViewFactoryType<<%= namePluralCamelized %>ViewInterface>;
