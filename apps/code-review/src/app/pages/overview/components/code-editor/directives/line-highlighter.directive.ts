import { AfterViewInit, Directive, Inject } from '@angular/core';
import type { editor, IRange } from 'monaco-editor';
import { MONACO_EDITOR } from '../../../tokens';
import { whetherLineWithCode } from '../helpers';

@Directive({
    selector: '[acuaLineHighlighter]',
    standalone: true
})
export class LineHighlighterDirective implements AfterViewInit {
    private model: editor.ITextModel = this.editor.getModel() as editor.ITextModel;

    private readonly decorationIds: string[] = [];
    private readonly options: editor.IModelDecorationOptions = {
        isWholeLine: true,
        className: 'selected-line'
    };

    constructor(
        @Inject(MONACO_EDITOR)
        private readonly editor: editor.IStandaloneCodeEditor
    ) {}

    public ngAfterViewInit(): void {
        this.initSelection();
    }

    public setModel(model: editor.ITextModel): void {
        this.model = model;
    }

    private initSelection(): void {
        this.editor.onMouseMove((e) => this.applyDecorationsToLine(e));
        this.editor.onMouseLeave(() => this.removeDecorations());
    }

    private applyDecorationsToLine(event: editor.IEditorMouseEvent): void {
        this.removeDecorations();

        if (!whetherLineWithCode(this.model, event.target)) {
            return;
        }

        const range = event.target.range as IRange;
        const decoration = {
            range: range,
            options: this.options
        };

        const decorationIds = this.setDecorationToLine([decoration]);
        this.decorationIds.push(...decorationIds);
    }

    private setDecorationToLine(
        newDecorations: editor.IModelDeltaDecoration[]
    ): string[] {
        return this.model.deltaDecorations([], newDecorations);
    }

    private removeDecorations(): void {
        this.model.deltaDecorations(this.decorationIds, []);

        if (this.decorationIds.length > 0) {
            this.decorationIds.length = 0;
        }
    }
}
