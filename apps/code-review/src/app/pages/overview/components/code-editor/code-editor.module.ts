import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CodeEditorComponent } from './code-editor.component';
import { CommentsModule } from './components';

@NgModule({
    declarations: [CodeEditorComponent],
    imports: [CommonModule, CommentsModule],
    exports: [CodeEditorComponent]
})
export class CodeEditorModule {}
