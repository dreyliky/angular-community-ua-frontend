import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MARKDOWN_BUTTON_ARRAY } from './data';
import { MarkdownEditorSelectorDirective } from './directives';
import { MarkdownButton } from './interfaces';

@Component({
    selector: 'acua-markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls: ['./markdown-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditorComponent {
    @ViewChild(MarkdownEditorSelectorDirective)
    public markdownEditorSelectorDirective!: MarkdownEditorSelectorDirective;

    public readonly markdownButtonArray = MARKDOWN_BUTTON_ARRAY;
    public isMarkdownEditorActive = true;
    public markdownText!: string;

    public onMarkdownButtonClick(markdownButton: MarkdownButton): void {
        this.markdownEditorSelectorDirective.insertMarkdownSyntax(markdownButton);

        if (this.isMarkdownEditorActive) {
            const markdownText = this.markdownEditorSelectorDirective.renderAsMarkdownIt();

            this.markdownText = markdownText;
        }
    }

    public onButtonActiveToggle(): void {
        this.isMarkdownEditorActive = !this.isMarkdownEditorActive;
    }
}
