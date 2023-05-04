import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';
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
    constructor(
        private readonly hostRef: ElementRef<HTMLTextAreaElement>,
        private readonly markdownInputState: MarkdownInputState
    ) {}

    public ngAfterViewInit(): void {
        this.onMarkdownTextAreaStateInit();
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

        this.handleMarkdownTextAreaChange();
    }

    @HostListener('change')
    protected onMarkdownTextAreaChange(): void {
        this.handleMarkdownTextAreaChange();
    }

    private onMarkdownTextAreaStateInit(): void {
        this.hostRef.nativeElement.value = this.markdownInputState.data!;
    }

    private insertMarkdownWithSelection(sides: MarkdownSyntaxSides): void {
        const markdownTextArea = this.hostRef.nativeElement;
        const { start, end } = this.getSelectedPositions();
        markdownTextArea.value =
            markdownTextArea.value.slice(0, start) +
            sides.leftSide +
            markdownTextArea.value.slice(start, end) +
            sides.rightSide +
            markdownTextArea.value.slice(end);
    }

    private insertMarkdownWithoutSelection(
        sides: MarkdownSyntaxSides,
        cursorPosition: number
    ): void {
        const markdownTextArea = this.hostRef.nativeElement;
        const { start, end } = this.getSelectedPositions();
        markdownTextArea.focus();
        markdownTextArea.value =
            markdownTextArea.value.slice(0, start) +
            sides.leftSide +
            markdownTextArea.value.slice(start, end) +
            sides.rightSide +
            markdownTextArea.value.slice(end);
        markdownTextArea.selectionEnd = start + cursorPosition!;
    }

    private isMarkdownTextAreaTextSelected(): boolean {
        const selectedPositions = this.getSelectedPositions();

        return selectedPositions.start === selectedPositions.end || selectedPositions.end === 0;
    }

    private getSelectedPositions(): InputSelectionRange {
        const markdownTextArea = this.hostRef.nativeElement;

        return {
            start: markdownTextArea.selectionStart,
            end: markdownTextArea.selectionEnd
        };
    }

    private handleMarkdownTextAreaChange(): void {
        this.markdownInputState.set(this.hostRef.nativeElement.value);
    }
}
