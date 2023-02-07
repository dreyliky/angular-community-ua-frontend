import { AuthComponent } from './acua-auth.component';
import { Routes } from '@angular/router';
import { AppRouteEnum } from '../../core/enums/app-route.enum';

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthComponent
    }
];
