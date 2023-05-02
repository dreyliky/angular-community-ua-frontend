import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MarkdownActiveTabState } from '../../../../states';

@Component({
    selector: 'acua-markdown-toggler',
    templateUrl: './markdown-toggler.component.html',
    styleUrls: ['./markdown-toggler.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownTogglerComponent implements OnInit {
    public markdownActive!: boolean;

    constructor(private readonly markdownActiveState: MarkdownActiveTabState) {}

    public ngOnInit(): void {
        this.initializeMarkdownActive();
    }

    public initializeMarkdownActive(): void {
        this.markdownActiveState.data$.subscribe((active) => {
            this.markdownActive = active!;
        });
    }

    public updateWriteClick(): void {
        this.markdownActiveState.set(true);
    }

    public updatePreviewClick(): void {
        this.markdownActiveState.set(false);
    }
}
