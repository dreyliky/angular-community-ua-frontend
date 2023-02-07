import { AuthComponent } from './acua-auth.component';
import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
