import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';
import { MarkdownInputState } from '../../../states';
import { MarkdownSyntax, MarkdownSyntaxSides } from '../interfaces';

interface inputSelectionRange {
    readonly start: number;
    readonly end: number;
}

@Directive({
    selector: '[markdownEditorInput]'
})
export class MarkdownEditorInputDirective implements AfterViewInit {
    constructor(
        private readonly hostRef: ElementRef<HTMLTextAreaElement>,
        private readonly markdownInputState: MarkdownInputState
    ) {}

    public ngAfterViewInit(): void {
        this.onMarkdownTextAreaStateInit();
    }

    public insertMarkdownSyntax(markdownButton: MarkdownSyntax): void {
        if (this.isMarkdownTextAreaTextSelected()) {
            this.insertMarkdownWithoutSelection(markdownButton);
        } else {
            this.insertMarkdownWithSelection(markdownButton);
        }

        this.handleMarkdownTextAreaChange();
    }

    private onMarkdownTextAreaStateInit(): void {
        this.hostRef.nativeElement.value = this.markdownInputState.data!;
    }

    @HostListener('change')
    private onMarkdownTextAreaChange(): void {
        this.handleMarkdownTextAreaChange();
    }

    private insertMarkdownWithoutSelection(markdownButton: MarkdownSyntax): void {
        if (markdownButton.hasDoubleSide) {
            this.insertMarkdownWithoutSelectionDoubleSide(
                markdownButton.getSyntaxSides(),
                markdownButton.position!
            );
        } else {
            this.insertMarkdownWithoutSelectionOneSide(markdownButton.getSyntaxSides());
        }
    }

    private insertMarkdownWithSelection(markdownButton: MarkdownSyntax): void {
        if (markdownButton.hasDoubleSide) {
            this.insertMarkdownWithSelectionDoubleSide(markdownButton.getSyntaxSides());
        } else {
            this.insertMarkdownWithSelectionOneSide(markdownButton.getSyntaxSides());
        }
    }

    private insertMarkdownWithSelectionDoubleSide(sides: MarkdownSyntaxSides): void {
        const markdownTextArea = this.hostRef.nativeElement;
        const { start, end } = this.getSelectedPositions();
        markdownTextArea.value =
            markdownTextArea.value.slice(0, start) +
            sides.leftSide +
            markdownTextArea.value.slice(start, end) +
            sides.rightSide +
            markdownTextArea.value.slice(end);
    }

    private insertMarkdownWithSelectionOneSide(sides: MarkdownSyntaxSides): void {
        const markdownTextArea = this.hostRef.nativeElement;
        const { start, end } = this.getSelectedPositions();
        markdownTextArea.value =
            markdownTextArea.value.slice(0, start) +
            sides.leftSide +
            markdownTextArea.value.slice(start, end) +
            markdownTextArea.value.slice(end);
    }

    private insertMarkdownWithoutSelectionDoubleSide(
        sides: MarkdownSyntaxSides,
        position: number
    ): void {
        const markdownTextArea = this.hostRef.nativeElement;
        const { start, end } = this.getSelectedPositions();

        const finText =
            markdownTextArea.value.substring(0, start) +
            sides.leftSide +
            markdownTextArea.value.substring(end) +
            sides.rightSide;
        markdownTextArea.value = finText;
        markdownTextArea.focus();
        markdownTextArea.selectionEnd = start + position!;
    }

    private insertMarkdownWithoutSelectionOneSide(sides: MarkdownSyntaxSides): void {
        const markdownTextArea = this.hostRef.nativeElement;
        markdownTextArea.focus();
        markdownTextArea.value = sides.leftSide + markdownTextArea.value;
    }

    private isMarkdownTextAreaTextSelected(): boolean {
        const selectedPositions = this.getSelectedPositions();

        return selectedPositions.start === selectedPositions.end || selectedPositions.end === 0;
    }

    private getSelectedPositions(): inputSelectionRange {
        const markdownTextArea = this.hostRef.nativeElement;

        return { start: markdownTextArea.selectionStart, end: markdownTextArea.selectionEnd };
    }

    private handleMarkdownTextAreaChange(): void {
        const value = this.hostRef.nativeElement.value;
        this.markdownInputState.set(value);
    }
}
