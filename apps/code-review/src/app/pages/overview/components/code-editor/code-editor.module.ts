import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CodeEditorComponent } from './code-editor.component';
import { CommentsAmountComponent } from './components';

@NgModule({
    declarations: [CodeEditorComponent, CommentsAmountComponent],
    imports: [CommonModule],
    exports: [CodeEditorComponent]
})
export class CodeEditorModule {}
