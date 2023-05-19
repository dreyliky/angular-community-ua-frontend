import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostListener
} from '@angular/core';
import { MarkdownButtonSyntax, MarkdownSyntaxSides } from '../components';
import { MarkdownInputState } from '../states';

interface InputSelectionRange {
    readonly start: number;
    readonly end: number;
}

@Directive({
    selector: '[markdownInput]'
})
export class MarkdownInputDirective implements AfterViewInit {
    private get hostElement(): HTMLTextAreaElement {
        return this.hostRef.nativeElement;
    }

    constructor(
        private readonly hostRef: ElementRef<HTMLTextAreaElement>,
        private readonly markdownInputState: MarkdownInputState
    ) {}

    public ngAfterViewInit(): void {
        this.hostElement.value = this.markdownInputState.data!;
    }

    public insertMarkdownSyntax(markdownButton: MarkdownButtonSyntax): void {
        if (this.isMarkdownTextAreaTextSelected()) {
            this.insertMarkdownWithoutSelection(
                markdownButton.syntaxSides,
                markdownButton.cursorPosition!
            );
        } else {
            this.insertMarkdownWithSelection(markdownButton.syntaxSides);
        }

        this.hostElement.dispatchEvent(new Event('input', { bubbles: true }));

        this.markdownInputState.set(this.hostElement.value);
    }

    @HostListener('change')
    protected onMarkdownTextAreaChange(): void {
        this.markdownInputState.set(this.hostElement.value);
    }

    private insertMarkdownWithSelection(sides: MarkdownSyntaxSides): void {
        const markdownTextArea = this.hostElement;
        const { start, end } = this.getSelectedPositions();
        markdownTextArea.focus();
        markdownTextArea.value =
            markdownTextArea.value.slice(0, start) +
            sides.left +
            markdownTextArea.value.slice(start, end) +
            sides.right +
            markdownTextArea.value.slice(end);
    }

    private insertMarkdownWithoutSelection(
        sides: MarkdownSyntaxSides,
        cursorPosition: number
    ): void {
        const markdownTextArea = this.hostElement;
        const { start } = this.getSelectedPositions();

        this.insertMarkdownWithSelection(sides);

        markdownTextArea.selectionEnd = start + cursorPosition!;
    }

    private isMarkdownTextAreaTextSelected(): boolean {
        const selectedPositions = this.getSelectedPositions();

        return (
            selectedPositions.start === selectedPositions.end ||
            selectedPositions.end === 0
        );
    }

    private getSelectedPositions(): InputSelectionRange {
        const markdownTextArea = this.hostElement;

        return {
            start: markdownTextArea.selectionStart,
            end: markdownTextArea.selectionEnd
        };
    }
}
