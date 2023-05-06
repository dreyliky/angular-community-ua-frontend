import { LoaderModule } from '@acua/shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { NgxAsyncModule } from 'ngx-async-directive';
import {
    CodeEditorModule,
    FileExplorerModule,
    HeaderModule
} from './components';
import { OverviewComponent } from './overview.component';
import { OVERVIEW_ROUTES } from './overview.routes';

@NgModule({
    declarations: [OverviewComponent],
    imports: [
        CommonModule,
        FileExplorerModule,
        HeaderModule,
        CodeEditorModule,
        MatSidenavModule,
        LoaderModule,
        NgxAsyncModule,
        RouterModule.forChild(OVERVIEW_ROUTES)
    ]
})
export class OverviewModule {}
