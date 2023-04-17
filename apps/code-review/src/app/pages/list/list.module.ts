import { UserAvatarModule } from '@acua/shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import {
    AllRequestsComponent,
    HistoricalRequestsComponent,
    MyRequestsComponent,
    RequestsTableComponent,
    ReviewRequestCreationButtonComponent
} from './components';
import { ListComponent } from './list.component';
import { LIST_ROUTES } from './list.routes';

@NgModule({
    declarations: [
        ListComponent,
        AllRequestsComponent,
        MyRequestsComponent,
        RequestsTableComponent,
        HistoricalRequestsComponent,
        ReviewRequestCreationButtonComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
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
