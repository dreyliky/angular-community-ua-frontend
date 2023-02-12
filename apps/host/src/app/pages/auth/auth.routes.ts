import { Routes } from '@angular/router';
import { AuthComponent } from './acua-auth.component';

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
