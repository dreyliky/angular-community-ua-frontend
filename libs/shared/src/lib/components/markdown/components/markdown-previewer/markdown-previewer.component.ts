import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'acua-markdown-previewer[text]',
    templateUrl: './markdown-previewer.component.html',
    styleUrls: ['./markdown-previewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownPreviewerComponent {
    @Input()
    public text = '';
}
