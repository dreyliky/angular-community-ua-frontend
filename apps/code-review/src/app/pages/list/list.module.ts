import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import {
    AllRequestsComponent,
    HistoricalRequestsComponent,
    MyRequestsComponent,
    RequestsTableComponent
} from './components';
import { ListComponent } from './list.component';
import { LIST_ROUTES } from './list.routes';
import { UserAvatarModule } from '@acua/shared';
@NgModule({
    declarations: [
        ListComponent,
        AllRequestsComponent,
        MyRequestsComponent,
        RequestsTableComponent,
        HistoricalRequestsComponent
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        MatChipsModule,
        MatTableModule,
        MatRippleModule,
        MatTooltipModule,
        UserAvatarModule,
        RouterModule.forChild(LIST_ROUTES)
    ]
})
export class ListModule {}
