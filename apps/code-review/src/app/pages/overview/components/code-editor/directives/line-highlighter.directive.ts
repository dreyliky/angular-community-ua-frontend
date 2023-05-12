import { Directive, Inject, OnDestroy } from '@angular/core';
import type { IDisposable, editor } from 'monaco-editor';
import { Subscription } from 'rxjs';
import { LINE_DECORATION_HAS_COMMENTS_CLASS_NAME as HAS_COMMENTS_CLASS } from '../constants';
import { LineDecoration } from '../models';
import { EditorCommentsState } from '../states';
import { MONACO_EDITOR } from '../tokens';

@Directive({
    selector: '[acuaLineHighlighter]',
    standalone: true
})
export class LineHighlighterDirective implements OnDestroy {
    private editorModelListener: IDisposable | undefined;
    private commentsObserver: Subscription | undefined;

    private get editorModel(): editor.ITextModel {
        return this.editor.getModel() as editor.ITextModel;
    }

    constructor(
        @Inject(MONACO_EDITOR)
        private readonly editor: editor.IStandaloneCodeEditor,
        private readonly editorCommentsState: EditorCommentsState
    ) {
        this.initEditorModelContentInitListener();
    }

    public ngOnDestroy(): void {
        this.editorModelListener?.dispose();
        this.commentsObserver?.unsubscribe();
    }

    private initEditorModelContentInitListener(): void {
        this.editorModelListener = this.editor.onDidChangeModelContent(() => {
            this.initDecorationsToAllLines();

            if (!this.commentsObserver) {
                this.initEditorCommentsObserver();
            }
        });
    }

    private initEditorCommentsObserver(): void {
        const commentsState$ = this.editorCommentsState.actualData$;

        this.commentsObserver = commentsState$.subscribe(() => {
            this.updateDecorationClassNamesForLinesWithComments();
        });
    }

    private initDecorationsToAllLines(): void {
        const totalLineAmount = this.editorModel.getLineCount();

        for (let line = 1; line <= totalLineAmount; line++) {
            this.updateLineDecoration(line);
        }
    }

    private updateDecorationClassNamesForLinesWithComments(): void {
        this.editorCommentsState
            .getEntries()
            .forEach(([line, commentAmount]) => {
                if (commentAmount) {
                    this.updateLineDecoration(+line, HAS_COMMENTS_CLASS);
                }
            });
    }

    private updateLineDecoration(line: number, className: string = ''): void {
        const decoration = this.editorModel.getLineDecorations(line)[0];
        const oldDecorationId = decoration ? [decoration.id] : [];
        const newLineDecoration = new LineDecoration(line, className);

        this.editorModel.deltaDecorations(oldDecorationId, [newLineDecoration]);
    }
}
