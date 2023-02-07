import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './acua-home.component';
import { HOME_ROUTES } from './home.routes';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, RouterModule.forChild(HOME_ROUTES)],
    exports: [HomeComponent]
})
export class HomeModule {}
