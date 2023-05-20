import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CodeEditorComponent } from './code-editor.component';
import { CommentsAmountComponent } from './components';

@NgModule({
    declarations: [CodeEditorComponent, CommentsAmountComponent],
    imports: [CommonModule, MatIconModule, MatBadgeModule],
    exports: [CodeEditorComponent]
})
export class CodeEditorModule {}
