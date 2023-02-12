import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
    AllRequestsComponent,
    HistoricalRequestsComponent,
    MyRequestsComponent
} from './components';
import { ListComponent } from './list.component';
import { LIST_ROUTES } from './list.routes';

@NgModule({
    declarations: [
        ListComponent,
        AllRequestsComponent,
        MyRequestsComponent,
        HistoricalRequestsComponent
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        MatChipsModule,
        RouterModule.forChild(LIST_ROUTES)
    ]
})
export class ListModule {}
