import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    MarkdownButtonComponent,
    MarkdownEditorComponent,
    MarkdownPreviewerComponent,
    MarkdownTogglerComponent,
    MarkdownToolbarComponent
} from './components';
import { MarkdownInputDirective } from './directives';
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
        MatButtonToggleModule,
        ReactiveFormsModule
    ],
    exports: [MarkdownEditorComponent, MarkdownPreviewerComponent],
    providers: [MarkdownInputState, MarkdownViewModeState]
})
export class MarkdownModule {}
