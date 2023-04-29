import { LoaderModule } from '@acua/shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { NgxAsyncModule } from 'ngx-async-directive';
import { CodeEditorModule, FileExplorerModule, HeaderModule } from './components';
import { OverviewComponent } from './overview.component';
import { OVERVIEW_ROUTES } from './overview.routes';
import { MonacoApiResolver } from './resolvers';

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
    ],
    providers: [MonacoApiResolver]
})
export class OverviewModule {}
