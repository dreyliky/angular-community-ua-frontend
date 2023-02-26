import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CodeEditorModule, FileExplorerModule } from './components';
import { MonacoEditorDirective } from './directives';
import { OverviewComponent } from './overview.component';
import { OVERVIEW_ROUTES } from './overview.routes';
import { MonacoApiResolver } from './resolvers';

@NgModule({
    declarations: [OverviewComponent, MonacoEditorDirective],
    imports: [
        CommonModule,
        FileExplorerModule,
        CodeEditorModule,
        RouterModule.forChild(OVERVIEW_ROUTES)
    ],
    providers: [MonacoApiResolver]
})
export class OverviewModule {}
