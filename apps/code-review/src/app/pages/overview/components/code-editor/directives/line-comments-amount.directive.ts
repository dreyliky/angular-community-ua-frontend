import { Directive, Inject, Injector } from '@angular/core';
import type { editor } from 'monaco-editor';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { filter, Subscription, tap } from 'rxjs';
import { MONACO_EDITOR } from '../../../tokens';
import { CommentContentWidget } from '../models';
import { EditorCommentsState } from '../states';

@Directive({
    selector: '[acuaLineCommentsAmount]',
    standalone: true
})
export class LineCommentsAmountDirective {
    private widgets: CommentContentWidget[] = [];

    constructor(
        @Inject(MONACO_EDITOR)
        private readonly editor: editor.IStandaloneCodeEditor,
        private readonly editorCommentsState: EditorCommentsState,
        private readonly injector: Injector
    ) {
        this.initEditorCommentsObserver();
    }

    @AutoUnsubscribe()
    private initEditorCommentsObserver(): Subscription {
        return this.editorCommentsState.data$
            .pipe(
                tap(() => this.clearWidgets()),
                filter(Boolean)
            )
            .subscribe(() => this.updateCommentAmountWidgets());
    }

    private updateCommentAmountWidgets(): void {
        this.editorCommentsState
            .getEntries()
            .forEach(([line, commentAmount]) => {
                const lineNumber = +line;

                if (commentAmount) {
                    this.applyWidgetToLine(lineNumber);
                }
            });
    }

    private applyWidgetToLine(lineNumber: number): void {
        const widget = new CommentContentWidget(lineNumber, this.injector);

        this.editor.addContentWidget(widget);
        this.widgets.push(widget);
    }

    private clearWidgets(): void {
        this.widgets.forEach((widget) => {
            this.editor.removeContentWidget(widget);
        });

        this.widgets = [];
    }
}
