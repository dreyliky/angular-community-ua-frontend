import {
    AbsentDataModule,
    ActionButtonModule,
    AuthModule,
    ScreenModule,
    UserAvatarModule
} from '@acua/shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import {
    AllRequestsComponent,
    HistoricalRequestsComponent,
    MyRequestsComponent,
    ReviewRequestCardComponent,
    ReviewRequestCreationButtonComponent
} from './components';
import { ListComponent } from './list.component';
import { LIST_ROUTES } from './list.routes';

@NgModule({
    declarations: [
        ListComponent,
        AllRequestsComponent,
        MyRequestsComponent,
        HistoricalRequestsComponent,
        ReviewRequestCreationButtonComponent,
        ReviewRequestCardComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatTabsModule,
        MatChipsModule,
        MatTableModule,
        MatCardModule,
        MatRippleModule,
        MatTooltipModule,
        MatIconModule,
        AbsentDataModule,
        ScreenModule,
        ActionButtonModule,
        UserAvatarModule,
        AuthModule,
        RouterModule.forChild(LIST_ROUTES)
    ]
})
export class ListModule {}
