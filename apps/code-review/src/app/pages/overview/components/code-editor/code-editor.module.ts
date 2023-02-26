import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CodeEditorComponent } from './code-editor.component';
import { CommentsAmountComponent } from './components';
import {
    LineCommentsAmountDirective,
    LineHighlighterDirective
} from './directives';

@NgModule({
    declarations: [CodeEditorComponent, CommentsAmountComponent],
    imports: [
        CommonModule,
        LineHighlighterDirective,
        LineCommentsAmountDirective
    ],
    exports: [CodeEditorComponent]
})
export class CodeEditorModule {}
