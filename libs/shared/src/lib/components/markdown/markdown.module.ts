import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    MarkdownEditorButtonComponent,
    MarkdownEditorComponent,
    MarkdownEditorInputDirective,
    MarkdownPreviewerComponent
} from './components';
import { MarkdownTogglerComponent } from './components/markdown-toggler/markdown-toggler.component';
import { MarkdownComponent } from './markdown.component';
import { MarkdownInputState } from './states';

@NgModule({
    declarations: [
        MarkdownComponent,
        MarkdownEditorComponent,
        MarkdownPreviewerComponent,
        MarkdownEditorButtonComponent,
        MarkdownEditorInputDirective,
        MarkdownTogglerComponent
    ],
    imports: [
        CommonModule,
        TextFieldModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatInputModule,
        MatButtonToggleModule
    ],
    exports: [MarkdownComponent],
    providers: [MarkdownInputState]
})
export class MarkdownModule {}
