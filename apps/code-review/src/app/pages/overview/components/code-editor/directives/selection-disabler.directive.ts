import { Directive, Inject } from '@angular/core';
import type { IRange, editor } from 'monaco-editor';
import { MONACO_EDITOR } from '../tokens';

@Directive({
    selector: '[acuaTextSelectionDisabler]',
    standalone: true
})
export class TextSelectionDisablerDirective {
    private readonly emptySelectionRange: IRange = {
        startLineNumber: 0,
        startColumn: 1,
        endLineNumber: 0,
        endColumn: 1
    };

    constructor(
        @Inject(MONACO_EDITOR)
        private readonly editor: editor.IStandaloneCodeEditor
    ) {
        this.editor.onDidChangeCursorSelection((event) => {
            if (!event.selection.isEmpty()) {
                this.editor.setSelection(this.emptySelectionRange);
            }
        });
    }
}
