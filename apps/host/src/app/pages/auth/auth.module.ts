import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginWidgetDirective } from '@host/directives/login-widget.directive';
import { AuthComponent } from './acua-auth.component';
import { AUTH_ROUTES } from './auth.routes';
import { LoginComponent } from './components/login/login.component';

@NgModule({
    declarations: [AuthComponent, LoginComponent, LoginWidgetDirective],
    imports: [CommonModule, RouterModule.forChild(AUTH_ROUTES)],
    exports: [AuthComponent]
})
export class AuthModule {}
