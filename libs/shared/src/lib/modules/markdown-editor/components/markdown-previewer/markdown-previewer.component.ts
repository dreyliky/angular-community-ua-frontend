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
    public readonly data$ = this.markdownInputState.data$.pipe(
        map((value) => new MarkdownIt().render(value!))
    );

    constructor(private readonly markdownInputState: MarkdownInputState) {}
}
