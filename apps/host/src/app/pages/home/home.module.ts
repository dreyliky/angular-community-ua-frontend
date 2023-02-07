import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './acua-home.component';
import { homeRoutes } from './home.routes';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, RouterModule.forChild(homeRoutes)],
    exports: [HomeComponent]
})
export class HomeModule {}
