import { Directive, Inject, Injector, OnDestroy } from '@angular/core';
import type { IDisposable, editor } from 'monaco-editor';
import { isTargetOverActualLineOfCode } from '../helpers';
import { CommentZone } from '../models';
import { EditorCommentsState } from '../states';
import { MONACO_EDITOR } from '../tokens';

@Directive({
    selector: '[acuaLineCommentsAmount]',
    standalone: true
})
export class LineCommentDirective implements OnDestroy {
    private mouseDownListener: IDisposable | undefined;
    private editorModelListener: IDisposable | undefined;

    private zoneIds = new Map<number, string>();

    constructor(
        @Inject(MONACO_EDITOR)
        private readonly editor: editor.IStandaloneCodeEditor,
        private readonly editorCommentsState: EditorCommentsState,
        private readonly injector: Injector
    ) {
        this.initEditorModelContentInitListener();
    }

    public ngOnDestroy(): void {
        this.editorModelListener?.dispose();
        this.mouseDownListener?.dispose();
    }

    private initEditorModelContentInitListener(): void {
        this.editorModelListener = this.editor.onDidChangeModelContent(() => {
            this.initEditorMouseDownListener();
        });
    }

    private initEditorMouseDownListener(): void {
        this.mouseDownListener?.dispose();

        this.mouseDownListener = this.editor.onMouseDown(({ target }) => {
            if (isTargetOverActualLineOfCode(target)) {
                const lineNumber = target.position!.lineNumber;
                const zoneId = this.getZoneIdIfExists(lineNumber);

                this.initZone(zoneId, lineNumber);
            }
        });
    }

    private initZone(zoneId: string | undefined, lineNumber: number): void {
        if (zoneId) {
            this.closeCommentZone(lineNumber, zoneId);

            return;
        }

        this.openCommentZone(lineNumber);
    }

    private openCommentZone(lineNumber: number): void {
        const commentZone = new CommentZone(lineNumber, this.injector);

        this.editor.changeViewZones((accessor: editor.IViewZoneChangeAccessor) => {
            const zoneId = accessor.addZone(commentZone);

            this.zoneIds.set(lineNumber, zoneId);

            accessor.layoutZone(zoneId);
        });
    }

    private closeCommentZone(lineNumber: number, zoneId: string): void {
        this.editor.changeViewZones((accessor: editor.IViewZoneChangeAccessor) => {
            accessor.removeZone(zoneId);

            this.zoneIds.delete(lineNumber);
        });
    }

    private getZoneIdIfExists(lineNumber: number): string | undefined {
        return this.zoneIds.get(lineNumber);
    }
}
