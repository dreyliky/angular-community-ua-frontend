import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import { MARKDOWN_BUTTON_ARRAY } from './data';
import { MarkdownSyntaxEnum } from './enums';
import { getMarkdownSyntax } from './functions';

@Component({
    selector: 'acua-markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls: ['./markdown-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditorComponent {
    @ViewChild('markdownTextArea')
    public markdownTextArea!: ElementRef<HTMLTextAreaElement>;

    public readonly markdownButtonArray = MARKDOWN_BUTTON_ARRAY;

    public isMarkdownEditorActive = true;

    public markdownText!: string;

    public insertMarkdownSyntax(markdownSyntaxType: MarkdownSyntaxEnum): void {
        if (this.isMarkdownTextAreaTextSelected()) {
            return this.insertMarkdownWithoutSelection(markdownSyntaxType);
        }

        this.insertMarkdownWithSelection(markdownSyntaxType);
    }

    public insertMarkdownWithoutSelection(markdownSyntaxType: MarkdownSyntaxEnum): void {
        const markdownTextArea = this.markdownTextArea.nativeElement;
        const markdownSyntaxText = getMarkdownSyntax(markdownSyntaxType, markdownTextArea.value);

        markdownTextArea.value = markdownSyntaxText;
    }

    public insertMarkdownWithSelection(markdownSyntaxType: MarkdownSyntaxEnum): void {
        const markdownTextArea = this.markdownTextArea.nativeElement;
        const selectedPositions = this.getSelectedPositions();
        const croppedText = markdownTextArea.value.substring(
            selectedPositions.start,
            selectedPositions.end
        );
        const markdownSyntaxText = getMarkdownSyntax(markdownSyntaxType, croppedText);
        const newMarkdownSyntaxText =
            markdownTextArea.value.slice(0, selectedPositions.start) +
            markdownSyntaxText +
            markdownTextArea.value.slice(selectedPositions.end);

        markdownTextArea.value = newMarkdownSyntaxText;
    }

    public renderAsMarkdownIt(): string {
        const markdownItText = new MarkdownIt().render(this.markdownTextArea.nativeElement.value);

        return markdownItText;
    }

    public onButtonActiveToggle(): void {
        this.isMarkdownEditorActive = !this.isMarkdownEditorActive;

        if (!this.isMarkdownEditorActive) {
            this.markdownText = this.renderAsMarkdownIt();
        }
    }

    private getSelectedPositions(): { start: number; end: number } {
        return {
            start: this.markdownTextArea.nativeElement.selectionStart,
            end: this.markdownTextArea.nativeElement.selectionEnd
        };
    }

    private isMarkdownTextAreaTextSelected(): boolean {
        const selectedPositions = this.getSelectedPositions();

        return selectedPositions.start === selectedPositions.end || selectedPositions.end === 0;
    }
}
