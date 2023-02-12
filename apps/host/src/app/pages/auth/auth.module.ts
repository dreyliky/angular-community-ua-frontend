import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './acua-auth.component';
import { AUTH_ROUTES } from './auth.routes';
import { LoginComponent } from './components';
import { LoginWidgetDirective } from './directives';

@NgModule({
    declarations: [AuthComponent, LoginComponent, LoginWidgetDirective],
    imports: [CommonModule, RouterModule.forChild(AUTH_ROUTES)],
    exports: [AuthComponent]
})
export class AuthModule {}
