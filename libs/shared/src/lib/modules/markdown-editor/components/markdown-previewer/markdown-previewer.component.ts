import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import { filter, map } from 'rxjs';
import { MarkdownInputState } from '../../states';

@Component({
    selector: 'acua-markdown-previewer',
    templateUrl: './markdown-previewer.component.html',
    styleUrls: ['./markdown-previewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownPreviewerComponent {
    public data$ = this.markdownInputState.data$.pipe(
        filter((data) => !!data),
        map((data) => new MarkdownIt().render(data!))
    );

    constructor(private readonly markdownInputState: MarkdownInputState) {}
}
