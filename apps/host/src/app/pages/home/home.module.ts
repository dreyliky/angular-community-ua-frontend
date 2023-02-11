import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './acua-home.component';
import { HeaderModule } from './components/header';
import { HOME_ROUTES } from './home.routes';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, RouterModule.forChild(HOME_ROUTES), HeaderModule],
    exports: [HomeComponent]
})
export class HomeModule {}
