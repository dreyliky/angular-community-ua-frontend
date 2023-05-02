import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { MarkdownInputComponent, MarkdownInputDirective } from './components';
import { MarkdownActiveTabState } from './states';

@Component({
    selector: 'acua-markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls: ['./markdown-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditorComponent implements OnInit, AfterViewInit {
    @ViewChild('markdownInput')
    public markdownInput!: MarkdownInputComponent;

    public markdownActive!: boolean;
    public markdownInputDirective!: MarkdownInputDirective;

    constructor(private readonly markdownActiveState: MarkdownActiveTabState) {}

    public ngOnInit(): void {
        this.initializeMarkdownActive();
    }

    public ngAfterViewInit(): void {
        this.markdownInputDirective = this.markdownInput.markdownEditorInputDirective;
    }

    public initializeMarkdownActive(): void {
        this.markdownActiveState.data$.subscribe((active) => {
            this.markdownActive = active!;
        });
    }
}
