import { AuthComponent } from './acua-auth.component';
import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        component: AuthComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
