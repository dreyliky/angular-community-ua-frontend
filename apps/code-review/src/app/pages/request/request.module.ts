import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { REQUEST_ROUTES } from './request.routes';
import { RequestComponent } from './request.component';
import { RequestsTableComponent } from './components/requests-table/requests-table.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';

@NgModule({
    declarations: [
        RequestComponent,
        RequestsTableComponent,
        UserAvatarComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatRippleModule,
        MatTooltipModule,
        RouterModule.forChild(REQUEST_ROUTES)
    ]
})
export class RequestModule {}
