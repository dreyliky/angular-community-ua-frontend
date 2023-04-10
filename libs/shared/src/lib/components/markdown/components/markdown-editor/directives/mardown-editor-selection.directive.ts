import { Directive, ElementRef } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import { MarkdownButton } from '../interfaces';

@Directive({
    selector: '[markdownEditorSelector]'
})
export class MarkdownEditorSelectorDirective {
    private readonly markdownIt = new MarkdownIt();

    constructor(private readonly hostRef: ElementRef<HTMLTextAreaElement>) {}

    public insertMarkdownSyntax(markdownButton: MarkdownButton): void {
        if (this.isMarkdownTextAreaTextSelected()) {
            this.insertMarkdownWithoutSelection(markdownButton);
        } else {
            this.insertMarkdownWithSelection(markdownButton);
        }
    }

    public insertMarkdownWithoutSelection(markdownButton: MarkdownButton): void {
        const markdownTextArea = this.hostRef.nativeElement;
        const markdownSyntaxText = markdownButton.getMarkdownSyntax(markdownTextArea.value);

        markdownTextArea.value = markdownSyntaxText;
    }

    public insertMarkdownWithSelection(markdownButton: MarkdownButton): void {
        const markdownTextArea = this.hostRef.nativeElement;
        const { start, end } = this.getSelectedPositions();
        const croppedText = markdownTextArea.value.substring(start, end);
        const markdownSyntaxText = markdownButton.getMarkdownSyntax(croppedText);
        const newMarkdownSyntaxText =
            markdownTextArea.value.slice(0, start) +
            markdownSyntaxText +
            markdownTextArea.value.slice(end);

        markdownTextArea.value = newMarkdownSyntaxText;
    }

    public renderAsMarkdownIt(): string {
        return this.markdownIt.render(this.hostRef.nativeElement.value);
    }

    private getSelectedPositions(): { start: number; end: number } {
        return {
            start: this.hostRef.nativeElement.selectionStart,
            end: this.hostRef.nativeElement.selectionEnd
        };
    }

    private isMarkdownTextAreaTextSelected(): boolean {
        const { start, end } = this.getSelectedPositions();

        return start === end || end === 0;
    }
}
