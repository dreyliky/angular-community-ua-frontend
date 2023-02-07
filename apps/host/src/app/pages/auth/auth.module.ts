import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './acua-auth.component';
import { AUTH_ROUTES } from './auth.routes';

@NgModule({
    declarations: [AuthComponent],
    imports: [CommonModule, RouterModule.forChild(AUTH_ROUTES)],
    exports: [AuthComponent]
})
export class AuthModule {}
