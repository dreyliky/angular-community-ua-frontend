import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MarkdownButtonSyntax } from './components';
import { MarkdownInputDirective } from './directives';
import { MarkdownInputState, MarkdownViewModeState } from './states';

@Component({
    selector: 'acua-markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls: ['./markdown-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditorComponent {
    @ViewChild(MarkdownInputDirective)
    public readonly markdownEditorInputDirective!: MarkdownInputDirective;

    public readonly markdownViewMode$ = this.markdownViewModeState.data$;
    public readonly previewData$ = this.markdownInputState.data$;

    constructor(
        private readonly markdownViewModeState: MarkdownViewModeState,
        private readonly markdownInputState: MarkdownInputState
    ) {}

    public onMarkdownButtonClick(button: MarkdownButtonSyntax): void {
        this.markdownEditorInputDirective.insertMarkdownSyntax(button);
    }
}
