import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { MARKDOWN_BUTTON_ARRAY } from './data';
import { MarkdownEditorInputDirective } from './directives';
import { MarkdownSyntax } from './interfaces';

const tooltipOptions: MatTooltipDefaultOptions = {
    showDelay: 400,
    hideDelay: 400,
    touchendHideDelay: 400
};

@Component({
    selector: 'acua-markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls: ['./markdown-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: tooltipOptions }]
})
export class MarkdownEditorComponent {
    @ViewChild(MarkdownEditorInputDirective)
    public markdownEditorSelectorDirective!: MarkdownEditorInputDirective;

    @ViewChild('markdownTextArea')
    public textAreaElement!: ElementRef<HTMLTextAreaElement>;

    public readonly markdownButtonArray = MARKDOWN_BUTTON_ARRAY;

    public onMarkdownButtonClick(markdownButton: MarkdownSyntax): void {
        this.markdownEditorSelectorDirective.insertMarkdownSyntax(markdownButton);
    }
}
