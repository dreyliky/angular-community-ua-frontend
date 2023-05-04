import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription } from 'rxjs';
import { MarkdownButtonSyntax } from './components';
import { MarkdownInputDirective } from './directives';
import { MarkdownViewModeState } from './states';

@Component({
    selector: 'acua-markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls: ['./markdown-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditorComponent implements OnInit {
    @ViewChild(MarkdownInputDirective)
    public markdownEditorInputDirective!: MarkdownInputDirective;

    public markdownViewMode!: boolean;

    constructor(
        private readonly markdownViewModeState: MarkdownViewModeState,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initializeMarkdownActive();
    }

    @AutoUnsubscribe()
    public initializeMarkdownActive(): Subscription {
        return this.markdownViewModeState.data$.subscribe((mode) => {
            this.markdownViewMode = mode!;

            this.changeDetector.detectChanges();
        });
    }

    public onMarkdownButtonClick(button: MarkdownButtonSyntax): void {
        this.markdownEditorInputDirective.insertMarkdownSyntax(button);
    }
}
