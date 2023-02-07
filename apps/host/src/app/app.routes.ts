import { Route } from '@angular/router';
import { AppRouteEnum } from './core/enums/app-route.enum';

export const appRoutes: Route[] = [
    {
        path: AppRouteEnum.Home,
        loadChildren: () =>
            import('./pages/home/home.module').then((m) => m.HomeModule)
    },
    {
        path: AppRouteEnum.Auth,
        loadChildren: () =>
            import('./pages/auth/auth.module').then((m) => m.AuthModule)
    },
    {
        path: '**',
        redirectTo: AppRouteEnum.Home
    }
];
