import type { editor } from 'monaco-editor';
import { LINE_DECORATION_CLASS_NAME } from '../constants';

export class LineDecoration implements editor.IModelDeltaDecoration {
    public readonly range = {
        startLineNumber: this.lineNumber,
        startColumn: 1,
        endLineNumber: this.lineNumber,
        endColumn: 1
    };

    public readonly options: editor.IModelDecorationOptions = {
        isWholeLine: true,
        className: `${LINE_DECORATION_CLASS_NAME} ${this.className}`,
        hoverMessage: {
            value: 'Click to add a comment'
        }
    };

    constructor(
        private readonly lineNumber: number,
        private readonly className: string
    ) {}
}
