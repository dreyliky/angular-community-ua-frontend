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
    MarkdownButtonComponent,
    MarkdownPreviewerComponent,
    MarkdownTogglerComponent,
    MarkdownToolbarComponent
} from './components';
import { MarkdownInputDirective } from './directives';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { MarkdownInputState, MarkdownViewModeState } from './states';

@NgModule({
    declarations: [
        MarkdownEditorComponent,
        MarkdownPreviewerComponent,
        MarkdownInputDirective,
        MarkdownButtonComponent,
        MarkdownTogglerComponent,
        MarkdownToolbarComponent
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
    exports: [MarkdownEditorComponent],
    providers: [MarkdownInputState, MarkdownViewModeState]
})
export class MarkdownEditorModule {}
