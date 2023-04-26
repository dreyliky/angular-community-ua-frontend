import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { MarkdownModule, UserAvatarModule } from '@acua/shared';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
    AllRequestsComponent,
    HistoricalRequestsComponent,
    MyRequestsComponent,
    RequestsTableComponent
} from './components';
import { ListComponent } from './list.component';
import { LIST_ROUTES } from './list.routes';
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
        MarkdownModule,
        MatButtonToggleModule,
        RouterModule.forChild(LIST_ROUTES)
    ]
})
export class ListModule {}
