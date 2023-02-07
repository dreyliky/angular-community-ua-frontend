import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RequestComponent } from './request.component';
import { REQUEST_ROUTES } from './request.routing';

@NgModule({
    declarations: [RequestComponent],
    imports: [CommonModule, RouterModule.forChild(REQUEST_ROUTES)]
})
export class RequestModule {}
