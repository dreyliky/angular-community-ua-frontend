import { InjectionToken } from '@angular/core';
import { environment } from 'apps/host/src/environments/environment';

export const ENVIRONMENT = new InjectionToken<typeof environment>(
    'An abstraction over environment object',
    {
        factory: () => environment
    }
);
