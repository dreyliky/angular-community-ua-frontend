import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './acua-home.component';
import { HOME_ROUTES } from './home.routes';
import { HeaderModule } from './components/header/header.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, RouterModule.forChild(HOME_ROUTES), HeaderModule],
    exports: [HomeComponent]
})
export class HomeModule {}
