import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'code-review',
        loadChildren: () =>
            import('code-review/Module').then((m) => m.RemoteEntryModule)
    }
];
