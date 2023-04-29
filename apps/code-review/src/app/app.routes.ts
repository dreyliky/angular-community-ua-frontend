import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
    {
        path: '',
        loadChildren: () => import('./remote-entry/entry.module').then((m) => m.RemoteEntryModule)
    }
];
