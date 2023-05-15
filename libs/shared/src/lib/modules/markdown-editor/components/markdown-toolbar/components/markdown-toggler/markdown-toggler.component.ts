import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownViewModeState } from '../../../../states';

@Component({
    selector: 'acua-markdown-toggler',
    templateUrl: './markdown-toggler.component.html',
    styleUrls: ['./markdown-toggler.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownTogglerComponent {
    public readonly viewMode$ = this.markdownViewModeState.data$;

    constructor(
        private readonly markdownViewModeState: MarkdownViewModeState
    ) {}

    public onWriteButtonClick(): void {
        this.markdownViewModeState.set(true);
    }

    public onPreviewButtonClick(): void {
        this.markdownViewModeState.set(false);
    }
}
