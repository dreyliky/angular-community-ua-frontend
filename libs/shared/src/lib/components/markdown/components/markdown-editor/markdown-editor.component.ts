import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { MARKDOWN_BUTTON_ARRAY } from './data';
import { MarkdownEditorInputDirective } from './directives';
import { MarkdownButton } from './interfaces';

@Component({
    selector: 'acua-markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls: ['./markdown-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditorComponent {
    @ViewChild(MarkdownEditorInputDirective)
    public markdownEditorSelectorDirective!: MarkdownEditorInputDirective;

    @ViewChild('markdownTextArea')
    public textAreaElement!: ElementRef<HTMLTextAreaElement>;

    public readonly markdownButtonArray = MARKDOWN_BUTTON_ARRAY;
    public isMarkdownEditorActive = true;
    public markdownText!: string;

    public onMarkdownButtonClick(markdownButton: MarkdownButton): void {
        const markdownText = this.markdownEditorSelectorDirective.insertMarkdownSyntax(
            markdownButton.getMarkdown(),
            markdownButton.getMarkdown(this.textAreaElement.nativeElement.value)
        );

        if (this.isMarkdownEditorActive) {
            this.markdownText = markdownText;
        }
    }

    public onButtonActiveToggle(): void {
        this.isMarkdownEditorActive = !this.isMarkdownEditorActive;
    }
}
