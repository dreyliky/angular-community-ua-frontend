import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownInputState } from '../../states';

@Component({
    selector: 'acua-markdown-previewer',
    templateUrl: './markdown-previewer.component.html',
    styleUrls: ['./markdown-previewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownPreviewerComponent {
    constructor(public readonly markdownInputState: MarkdownInputState) {}
}
