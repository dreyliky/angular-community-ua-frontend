import { Routes } from '@angular/router';
import { AuthComponent } from './acua-auth.component';
import { LoginComponent } from './components/login/login.component';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
