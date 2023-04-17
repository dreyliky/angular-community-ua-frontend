import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './acua-auth.component';
import { AUTH_ROUTES } from './auth.routes';
import { LoginWidgetDirective } from './directives';

@NgModule({
    declarations: [AuthComponent, LoginWidgetDirective],
    imports: [CommonModule, RouterModule.forChild(AUTH_ROUTES), MatSnackBarModule],
    exports: [AuthComponent]
})
export class AuthModule {}
