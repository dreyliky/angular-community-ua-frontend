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
    private readonly widgets: CommentContentWidget[] = [];

    constructor(
        @Inject(MONACO_EDITOR)
        private readonly editor: editor.IStandaloneCodeEditor,
        private readonly editorCommentsState: EditorCommentsState,
        private readonly injector: Injector
    ) {
        this.initEditorModelContentInitListener();
    }

    private initEditorModelContentInitListener(): void {
        const listener = this.editor.onDidChangeModelContent(() => {
            this.initEditorCommentsObserver();
            listener.dispose();
        });
    }

    @AutoUnsubscribe()
    private initEditorCommentsObserver(): Subscription {
        return this.editorCommentsState.data$
            .pipe(
                tap(() => this.removePreviousWidgetsIfExist()),
                filter((Boolean))
            )
            .subscribe(() => this.updateCommentAmountWidgets());
    }

    private updateCommentAmountWidgets(): void {
        this.editorCommentsState
            .getEntries()
            .forEach(([line, commentAmount]) => {
                const lineNumber = +line;

                if (commentAmount) {
                    const widget = this.applyWidgetToLine(lineNumber);
                    this.widgets.push(widget);
                }
            });
    }

    private applyWidgetToLine(lineNumber: number): CommentContentWidget {
        const widget = new CommentContentWidget(lineNumber, this.injector);

        this.editor.addContentWidget(widget);

        return widget;
    }

    private removePreviousWidgetsIfExist(): void {
        if (this.widgets.length === 0) {
            return;
        }

        for (const widget of this.widgets) {
            this.editor.removeContentWidget(widget);
        }
    }
}
