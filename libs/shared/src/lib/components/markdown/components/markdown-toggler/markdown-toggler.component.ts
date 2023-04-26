import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'acua-markdown-toggler',
    templateUrl: './markdown-toggler.component.html',
    styleUrls: ['./markdown-toggler.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownTogglerComponent {
    @Output()
    public markdownState = new EventEmitter<boolean>();

    public isMarkdownActive = true;

    public handleWriteClick(): void {
        this.markdownState.emit(true);
        this.isMarkdownActive = true;
    }

    public handlePreviewClick(): void {
        this.markdownState.emit(false);
        this.isMarkdownActive = false;
    }
}
