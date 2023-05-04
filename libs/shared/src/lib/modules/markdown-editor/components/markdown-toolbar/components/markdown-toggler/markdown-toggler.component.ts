import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription } from 'rxjs';
import { MarkdownViewModeState } from '../../../../states';

@Component({
    selector: 'acua-markdown-toggler',
    templateUrl: './markdown-toggler.component.html',
    styleUrls: ['./markdown-toggler.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownTogglerComponent implements OnInit {
    public markdownViewMode!: boolean;

    constructor(
        private readonly markdownViewModeState: MarkdownViewModeState,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initializeMarkdownActive();
    }

    @AutoUnsubscribe()
    public initializeMarkdownActive(): Subscription {
        return this.markdownViewModeState.data$.subscribe((mode) => {
            this.markdownViewMode = mode!;

            this.changeDetector.detectChanges();
        });
    }

    public updateWriteClick(): void {
        this.markdownViewModeState.set(true);
    }

    public updatePreviewClick(): void {
        this.markdownViewModeState.set(false);
    }
}
