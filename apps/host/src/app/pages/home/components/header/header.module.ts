import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

@NgModule({
    declarations: [HeaderComponent, UserMenuComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule
    ],
    exports: [HeaderComponent]
})
export class HeaderModule {}
