import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesModule } from './../../features/features.module';
import { AuthComponent } from './acua-auth.component';
import { AUTH_ROUTES } from './auth.routes';
import { LoginComponent } from './components/login/login.component';

@NgModule({
    declarations: [AuthComponent, LoginComponent],
    imports: [CommonModule, RouterModule.forChild(AUTH_ROUTES), FeaturesModule],
    exports: [AuthComponent]
})
export class AuthModule {}
