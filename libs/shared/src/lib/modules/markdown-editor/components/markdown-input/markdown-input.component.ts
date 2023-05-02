import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MarkdownInputDirective } from './directives';

@Component({
    selector: 'acua-markdown-input',
    templateUrl: './markdown-input.component.html',
    styleUrls: ['./markdown-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownInputComponent {
    @ViewChild(MarkdownInputDirective)
    public markdownEditorInputDirective!: MarkdownInputDirective;
}
