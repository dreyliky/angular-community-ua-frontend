import { Directive, ElementRef } from '@angular/core';
import * as MarkdownIt from 'markdown-it';

interface inputSelectionRange {
    readonly start: number;
    readonly end: number;
}

@Directive({
    selector: '[markdownEditorInput]'
})
export class MarkdownEditorInputDirective {
    private readonly markdownIt = new MarkdownIt();

    constructor(private readonly hostRef: ElementRef<HTMLTextAreaElement>) {}

    public insertMarkdownSyntax(markdown: string, markdownContext: string): string {
        if (this.isMarkdownTextAreaTextSelected()) {
            this.insertMarkdownWithoutSelection(markdown);
        } else {
            this.insertMarkdownWithSelection(markdownContext);
        }

        return this.render();
    }

    public render(): string {
        return this.markdownIt.render(this.hostRef.nativeElement.value);
    }

    private insertMarkdownWithoutSelection(markdown: string): void {
        const markdownTextArea = this.hostRef.nativeElement;
        const { start, end } = this.getSelectedPositions();
        const specifiedValue = markdownTextArea.value.substring(start, end);

        if (markdown === '****') {
            this.insertBoldMarkdown(specifiedValue);
        } else if (markdown === '__') {
            this.insertItalicMarkdown(specifiedValue);
        } else {
            this.insertHeaderMarkdown(markdownTextArea);
        }
    }

    private insertMarkdownWithSelection(markdownContext: string): void {
        const markdownTextArea = this.hostRef.nativeElement;
        const { start, end } = this.getSelectedPositions();
        const newMarkdownSyntaxText =
            markdownTextArea.value.slice(0, start) +
            markdownContext +
            markdownTextArea.value.slice(end);

        markdownTextArea.value = newMarkdownSyntaxText;
    }

    private insertBoldMarkdown(specifiedValue: string): void {
        this.insertMarkdownAtPosition(`**${specifiedValue}**`, 2);
    }

    private insertItalicMarkdown(specifiedValue: string): void {
        this.insertMarkdownAtPosition(`_${specifiedValue}_`, 1);
    }

    private insertHeaderMarkdown(markdownTextArea: HTMLTextAreaElement): void {
        markdownTextArea.value = `# ${markdownTextArea.value.trim()}`;
    }

    private insertMarkdownAtPosition(specifiedValue: string, position: number): void {
        const markdownTextArea = this.hostRef.nativeElement;
        const { start, end } = this.getSelectedPositions();

        const finText =
            markdownTextArea.value.substring(0, start) +
            specifiedValue +
            markdownTextArea.value.substring(end);
        markdownTextArea.value = finText;
        markdownTextArea.focus();
        markdownTextArea.selectionEnd = start + position;
    }

    private getSelectedPositions(): inputSelectionRange {
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
