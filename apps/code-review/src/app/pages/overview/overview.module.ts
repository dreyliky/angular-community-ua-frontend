import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileExplorerModule } from './components';
import { MonacoEditorDirective } from './directives';
import { OverviewComponent } from './overview.component';
import { OVERVIEW_ROUTES } from './overview.routes';

@NgModule({
    declarations: [OverviewComponent, MonacoEditorDirective],
    imports: [
        CommonModule,
        FileExplorerModule,
        RouterModule.forChild(OVERVIEW_ROUTES)
    ]
})
export class OverviewModule {}
