import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CodeEditorModule, FileExplorerModule, HeaderModule } from './components';
import { MatSidenavModule } from '@angular/material/sidenav';
import { OverviewComponent } from './overview.component';
import { OVERVIEW_ROUTES } from './overview.routes';
import { MonacoApiResolver } from './resolvers';
import { ReviewRequestCommentsState } from './states';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    declarations: [OverviewComponent, LoaderComponent],
    imports: [
        CommonModule,
        FileExplorerModule,
        HeaderModule,
        CodeEditorModule,
        MatSidenavModule,
        RouterModule.forChild(OVERVIEW_ROUTES)
    ],
    providers: [MonacoApiResolver, ReviewRequestCommentsState]
})
export class OverviewModule {}
