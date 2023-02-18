import { Route } from '@angular/router';

import { AppRouteEnum } from '@code-review/core';
import { RemoteEntryComponent } from './entry.component';

export const REMOTE_ROUTES: Route[] = [
    {
        path: '',
        component: RemoteEntryComponent,
        children: [
            {
                path: AppRouteEnum.List,
                loadChildren: () =>
                    import('../pages/list/list.module').then((m) => m.ListModule)
            },
            {
                path:  AppRouteEnum.Overview,
                loadChildren: () =>
                    import('../pages/overview/overview.module').then((m) => m.OverviewModule)
            },
            {
                path: AppRouteEnum.Request,
                loadChildren: () =>
                    import('../pages/request/request.module').then((m) => m.RequestModule)
            },
            {
                path: '**',
                redirectTo: AppRouteEnum.List
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
