import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Output
} from '@angular/core';
import { MarkdownViewModeState } from '../../states';
import { MARKDOWN_BUTTON_ARRAY } from './data';
import { MarkdownButtonSyntax } from './interfaces';

@Component({
    selector: 'acua-markdown-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownToolbarComponent {
    @Output()
    public markdownButtonClick = new EventEmitter<MarkdownButtonSyntax>();

    public readonly markdownViewMode$ = this.markdownViewModeState.data$;
    public readonly markdownButtonArray = MARKDOWN_BUTTON_ARRAY;

    constructor(
        private readonly markdownViewModeState: MarkdownViewModeState
    ) {}
}
