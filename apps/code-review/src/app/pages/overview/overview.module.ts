import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CodeEditorComponent } from './components';
import { FileTreeModule } from './components/file-tree/file-tree.module';
import { OverviewComponent } from './overview.component';
import { OVERVIEW_ROUTES } from './overview.routes';

@NgModule({
    declarations: [
        OverviewComponent,
        CodeEditorComponent
    ],
    imports: [
        CommonModule,
        FileTreeModule,
        RouterModule.forChild(OVERVIEW_ROUTES)
    ]
})
export class OverviewModule {}
