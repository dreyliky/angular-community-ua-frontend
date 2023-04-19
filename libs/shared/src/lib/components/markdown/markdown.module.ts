import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
    MarkdownEditorButtonComponent,
    MarkdownEditorComponent,
    MarkdownEditorInputDirective,
    MarkdownPreviewerComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        TextFieldModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatButtonToggleModule
    ],
    declarations: [
        MarkdownEditorComponent,
        MarkdownPreviewerComponent,
        MarkdownEditorButtonComponent,
        MarkdownEditorInputDirective
    ],
    exports: [MarkdownEditorComponent, MarkdownPreviewerComponent]
})
export class MarkdownModule {}
