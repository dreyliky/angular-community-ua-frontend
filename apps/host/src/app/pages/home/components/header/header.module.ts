import { UserAvatarModule } from '@acua/shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { LoginButtonComponent, UserMenuComponent } from './components';
import { LoginWidgetDirective } from './directives';
import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [HeaderComponent, UserMenuComponent, LoginButtonComponent, LoginWidgetDirective],
    imports: [
        CommonModule,
        RouterModule,
        UserAvatarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDividerModule
    ],
    exports: [HeaderComponent]
})
export class HeaderModule {}
