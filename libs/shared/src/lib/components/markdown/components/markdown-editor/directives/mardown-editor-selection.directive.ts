import { Directive, ElementRef } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import { MarkdownButton } from '../interfaces/markdown-button.interface';

@Directive({
    selector: '[markdownEditorSelector]'
})
export class MarkdownEditorSelectorDirective {
    constructor(private readonly hostRef: ElementRef<HTMLTextAreaElement>) {}

    public insertMarkdownSyntax(markdownButton: MarkdownButton): void {
        if (this.isMarkdownTextAreaTextSelected()) {
            return this.insertMarkdownWithoutSelection(markdownButton);
        }
        this.insertMarkdownWithSelection(markdownButton);
    }

    public insertMarkdownWithoutSelection(markdownButton: MarkdownButton): void {
        const markdownTextArea = this.hostRef.nativeElement;
        const markdownSyntaxText = markdownButton.getMarkdownSyntax(markdownTextArea.value);

        markdownTextArea.value = markdownSyntaxText;
    }

    public insertMarkdownWithSelection(markdownButton: MarkdownButton): void {
        const markdownTextArea = this.hostRef.nativeElement;
        const selectedPositions = this.getSelectedPositions();
        const croppedText = markdownTextArea.value.substring(
            selectedPositions.start,
            selectedPositions.end
        );
        const markdownSyntaxText = markdownButton.getMarkdownSyntax(croppedText);
        const newMarkdownSyntaxText =
            markdownTextArea.value.slice(0, selectedPositions.start) +
            markdownSyntaxText +
            markdownTextArea.value.slice(selectedPositions.end);

        markdownTextArea.value = newMarkdownSyntaxText;
    }

    public renderAsMarkdownIt(): string {
        const markdownItText = new MarkdownIt().render(this.hostRef.nativeElement.value);

        return markdownItText;
    }

    private getSelectedPositions(): { start: number; end: number } {
        return {
            start: this.hostRef.nativeElement.selectionStart,
            end: this.hostRef.nativeElement.selectionEnd
        };
    }

    private isMarkdownTextAreaTextSelected(): boolean {
        const selectedPositions = this.getSelectedPositions();

        return selectedPositions.start === selectedPositions.end || selectedPositions.end === 0;
    }
}
