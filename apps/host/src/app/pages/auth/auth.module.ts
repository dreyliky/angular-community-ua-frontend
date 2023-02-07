import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './acua-auth.component';
import { authRoutes } from './auth.routes';

@NgModule({
    declarations: [AuthComponent],
    imports: [CommonModule, RouterModule.forChild(authRoutes)],
    exports: [AuthComponent]
})
export class AuthModule {}
