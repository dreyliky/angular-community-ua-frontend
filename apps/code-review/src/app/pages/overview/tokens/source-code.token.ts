import { InjectionToken } from '@angular/core';
import { MonacoTreeNode } from '@code-review/shared';

export const SOURCE_CODE = new InjectionToken<MonacoTreeNode[]>(
    'SOURCE CODE'
);
