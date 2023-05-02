import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownActiveTabState } from '../../states';
import { MarkdownInputDirective } from '../markdown-input';
import { MARKDOWN_BUTTON_ARRAY } from './data';
import { MarkdownButtonSyntax } from './interfaces';

@Component({
    selector: 'acua-markdown-toolbar',
    templateUrl: './markdown-toolbar.component.html',
    styleUrls: ['./markdown-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownToolbarComponent {
    @Input()
    public markdownInputDirective!: MarkdownInputDirective;

    public readonly markdownActive$ = this.markdownActiveState.data$;
    public readonly markdownButtonArray = MARKDOWN_BUTTON_ARRAY;

    constructor(private readonly markdownActiveState: MarkdownActiveTabState) {}

    public onMarkdownButtonClick(button: MarkdownButtonSyntax): void {
        this.markdownInputDirective.insertMarkdownSyntax(button);
    }
}
