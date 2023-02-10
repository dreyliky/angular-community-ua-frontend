import { Routes } from '@angular/router';
import { HomeComponent } from './acua-home.component';
import { HomeRouteEnum } from './enums';

export const HOME_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: HomeRouteEnum.CodeReview,
                loadChildren: () =>
                    import('code-review/Module').then(
                        (m) => m.RemoteEntryModule
                    )
            },
            {
                path: '**',
                redirectTo: HomeRouteEnum.CodeReview
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
