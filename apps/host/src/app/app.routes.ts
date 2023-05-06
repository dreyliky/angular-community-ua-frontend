import { Route } from '@angular/router';
import { AppRouteEnum } from './core/enums/app-route.enum';

export const APP_ROUTES: Route[] = [
    {
        path: AppRouteEnum.Home,
        loadChildren: () =>
            import('./pages/home/home.module').then((m) => m.HomeModule)
    },
    {
        path: '**',
        redirectTo: AppRouteEnum.Home
    }
];
