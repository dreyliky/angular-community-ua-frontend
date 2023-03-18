import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'acua-markdown',
    templateUrl: './markdown.component.html',
    styleUrls: ['./markdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownComponent {}
