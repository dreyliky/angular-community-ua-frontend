import { Route } from '@angular/router';

import { AppRouteEnum } from './core/enums/app-route-enum';

export const appRoutes: Route[] = [
    {
        path: AppRouteEnum.HOME,
        loadChildren: () =>
            import('./remote-entry/entry.module').then((m) => m.RemoteEntryModule)
    },
    {
        path: AppRouteEnum.LIST,
        loadChildren: () =>
            import('./pages/list/list.module').then((m) => m.ListModule)
    },
    {
        path: AppRouteEnum.REQUEST,
        loadChildren: () =>
            import('./pages/request/request.module').then((m) => m.RequestModule)
    },
    {
        path: AppRouteEnum.OVERVIEW,
        loadChildren: () =>
            import('./pages/overview/overview.module').then((m) => m.OverviewModule)
    }
];
