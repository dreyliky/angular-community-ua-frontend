import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './acua-header.component';
import { RouterModule } from '@angular/router';
import { HeaderMenuComponent } from './header-user/header-user-menu/acua-header-menu.component';
import { HeaderUserComponent } from './header-user/acua-header-user.component';

@NgModule({
    declarations: [HeaderComponent, HeaderMenuComponent, HeaderUserComponent],
    imports: [CommonModule, RouterModule],
    exports: [HeaderComponent]
})
export class HeaderModule {}
