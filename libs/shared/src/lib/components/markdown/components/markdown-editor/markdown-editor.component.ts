import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MARKDOWN_BUTTON_ARRAY } from './data';
import { MarkdownEditorSelectorDirective } from './directives';
import { MarkdownSyntaxEnum } from './enums';

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

    public insertMarkdownSyntax(markdownSyntaxType: MarkdownSyntaxEnum): void {
        this.markdownEditorSelectorDirective.insertMarkdownSyntax(markdownSyntaxType);

        if (!this.isMarkdownEditorActive) {
            this.markdownText = this.markdownEditorSelectorDirective.renderAsMarkdownIt();
        }
    }

    public onButtonActiveToggle(): void {
        this.isMarkdownEditorActive = !this.isMarkdownEditorActive;
    }
}
