import { Routes } from '@angular/router';
import { AuthComponent } from './acua-auth.component';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutesEnum } from './enums/auth-routes.enum';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: AuthRoutesEnum.Login,
                component: LoginComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
