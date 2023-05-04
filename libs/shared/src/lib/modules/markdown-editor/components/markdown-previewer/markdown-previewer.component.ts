import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import { map } from 'rxjs';
import { MarkdownInputState } from '../../states';

@Component({
    selector: 'acua-markdown-previewer',
    templateUrl: './markdown-previewer.component.html',
    styleUrls: ['./markdown-previewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownPreviewerComponent {
    public data$ = this.markdownViewModeState.data$.pipe(
        map((mode) => new MarkdownIt().render(mode! ?? ''))
    );

    constructor(private readonly markdownViewModeState: MarkdownInputState) {}
}
