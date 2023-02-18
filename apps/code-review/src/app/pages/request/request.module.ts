import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { REQUEST_ROUTES } from './request.routes';
import { RequestComponent } from './request.component';

@NgModule({
    declarations: [RequestComponent],
    imports: [
        CommonModule,
        MatRippleModule,
        MatTooltipModule,
        RouterModule.forChild(REQUEST_ROUTES)
    ]
})
export class RequestModule {}
