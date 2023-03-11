import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    CodeEditorModule,
    FileExplorerModule,
    HeaderModule
} from './components';
import { OverviewComponent } from './overview.component';
import { OVERVIEW_ROUTES } from './overview.routes';
import { MonacoApiResolver, ReviewRequestCommentsResolver } from './resolvers';
import { ReviewRequestCommentsState } from './states';

@NgModule({
    declarations: [OverviewComponent],
    imports: [
        CommonModule,
        FileExplorerModule,
        HeaderModule,
        CodeEditorModule,
        RouterModule.forChild(OVERVIEW_ROUTES)
    ],
    providers: [
        MonacoApiResolver,
        ReviewRequestCommentsResolver,
        ReviewRequestCommentsState
    ]
})
export class OverviewModule {}
