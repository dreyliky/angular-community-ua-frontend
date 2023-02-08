import { Routes } from '@angular/router';
import { AppRouteEnum } from '../../core/enums/app-route.enum';
import { HomeComponent } from './acua-home.component';

export const HOME_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: AppRouteEnum.CodeReview,
                loadChildren: () =>
                    import('code-review/Module').then(
                        (m) => m.RemoteEntryModule
                    )
            },
            {
                path: '**',
                redirectTo: AppRouteEnum.CodeReview
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
