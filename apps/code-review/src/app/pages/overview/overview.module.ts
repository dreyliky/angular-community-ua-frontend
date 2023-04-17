import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CodeEditorModule, FileExplorerModule, HeaderModule } from './components';
import { MatSidenavModule } from '@angular/material/sidenav';
import { OverviewComponent } from './overview.component';
import { OVERVIEW_ROUTES } from './overview.routes';
import { MonacoApiResolver, ReviewRequestCommentsResolver, SourceCodeResolver } from './resolvers';
import { ReviewRequestCommentsState } from './states';

@NgModule({
    declarations: [OverviewComponent],
    imports: [
        CommonModule,
        FileExplorerModule,
        HeaderModule,
        CodeEditorModule,
        MatSidenavModule,
        RouterModule.forChild(OVERVIEW_ROUTES)
    ],
    providers: [
        MonacoApiResolver,
        ReviewRequestCommentsResolver,
        ReviewRequestCommentsState,
        SourceCodeResolver
    ]
})
export class OverviewModule {}
