import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { HeaderUserComponent } from './header-user/header-user.component';
import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [HeaderComponent, HeaderUserComponent],
    imports: [CommonModule, RouterModule, MatIconModule, MatMenuModule, MatButtonModule],
    exports: [HeaderComponent]
})
export class HeaderModule {}
