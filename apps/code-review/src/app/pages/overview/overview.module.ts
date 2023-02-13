import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { FileTreeModule } from './components/file-tree/file-tree.module';
import { OverviewComponent } from './overview.component';
import { OVERVIEW_ROUTES } from './overview.routes';

@NgModule({
    declarations: [OverviewComponent, CodeEditorComponent],
    imports: [CommonModule, RouterModule.forChild(OVERVIEW_ROUTES), FileTreeModule]
})
export class OverviewModule {}
