import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { MarkdownSharedModule, UserAvatarModule } from '@acua/shared';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
    AllRequestsComponent,
    HistoricalRequestsComponent,
    MyRequestsComponent,
    RequestsTableComponent
} from './components';
import { MarkdownComponent } from './components/markdown';
import { ListComponent } from './list.component';
import { LIST_ROUTES } from './list.routes';
@NgModule({
    declarations: [
        ListComponent,
        AllRequestsComponent,
        MyRequestsComponent,
        RequestsTableComponent,
        HistoricalRequestsComponent,
        MarkdownComponent
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        MatChipsModule,
        MatTableModule,
        MatRippleModule,
        MatTooltipModule,
        UserAvatarModule,
        MarkdownSharedModule,
        MatButtonToggleModule,
        RouterModule.forChild(LIST_ROUTES)
    ]
})
export class ListModule {}
