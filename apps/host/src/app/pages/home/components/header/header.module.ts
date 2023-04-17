import { UserAvatarModule } from '@acua/shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { LoginButtonComponent } from './login-button';
import { UserMenuComponent } from './user-menu';

@NgModule({
    declarations: [HeaderComponent, UserMenuComponent, LoginButtonComponent],
    imports: [
        CommonModule,
        RouterModule,
        UserAvatarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule
    ],
    exports: [HeaderComponent]
})
export class HeaderModule {}
