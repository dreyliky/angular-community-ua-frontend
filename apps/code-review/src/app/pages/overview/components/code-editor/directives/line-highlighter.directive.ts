import { AfterViewInit, Directive, Inject, Input } from '@angular/core';
import type { editor, IRange } from 'monaco-editor';
import { MONACO_EDITOR } from '../../../tokens';
import { whetherLineWithCode } from '../helpers';
import { EditorCommentMetadata } from '../interfaces';

@Directive({
    selector: '[acuaLineHighlighter]',
    standalone: true
})
export class LineHighlighterDirective implements AfterViewInit {
    @Input()
    public commentData!: EditorCommentMetadata[];

    private decorationIds: string[] = [];

    constructor(
        @Inject(MONACO_EDITOR)
        private readonly editor: editor.IStandaloneCodeEditor
    ) {}

    public ngAfterViewInit(): void {
        this.init();
    }

    private init(): void {
        this.applyHighlighterToAllLine();

        this.editor.onMouseMove((e) => {
            this.applyHoverToLine(e.target);
            this.refreshHighlighter(e.target.position?.lineNumber as number);
        });

        this.editor.onMouseLeave(() => this.applyHighlighterToAllLine());
    }

    private applyHighlighterToAllLine(): void {
        for (const commentData of this.commentData) {
            this.applyHighlighterToLine(commentData.lineNumber);
        }
    }

    private async model(): Promise<editor.ITextModel> {
        return this.editor.getModel() as editor.ITextModel;
    }

    private async applyHoverToLine(target: editor.IMouseTarget): Promise<void> {
        const model = await this.model();

        if (!whetherLineWithCode(model, target)) {
            return;
        }

        const lineNumber = target.position?.lineNumber as number;
        const lineDecoration = this.getLineDecoration(model, lineNumber);

        if (!lineDecoration) {
            return;
        }
        const oldDecoration = lineDecoration ? [lineDecoration.id] : [];
        const newDecoration = this.getNewDecoration(lineNumber, 'acua-editor-selected-line');
        const decorationId = await this.setDecorationToLine(newDecoration, oldDecoration);

        this.updateDecorationIds(decorationId[0], lineDecoration.id);
    }

    private async applyHighlighterToLine(lineNumber: number): Promise<void> {
        const model = await this.model();
        const lineDecoration = this.getLineDecoration(model, lineNumber);
        const oldDecoration = lineDecoration ? [lineDecoration.id] : [];
        const newDecoration = this.getNewDecoration(lineNumber, 'acua-editor-highlight-line');
        const decorationId = await this.setDecorationToLine(newDecoration, oldDecoration);

        this.updateDecorationIds(decorationId[0], lineDecoration?.id);
    }

    private async setDecorationToLine(
        newDecoration: editor.IModelDeltaDecoration,
        oldDecoration: string[] = []
    ): Promise<string[]> {
        const model = await this.model();

        return model.deltaDecorations(oldDecoration, [newDecoration]);
    }

    private refreshHighlighter(lineNumber: number): void {
        for (const commentData of this.commentData) {
            if (commentData.lineNumber !== lineNumber) {
                this.applyHighlighterToLine(commentData.lineNumber);
            }
        }
    }

    private getLineDecoration(
        model: editor.ITextModel,
        lineNumber: number
    ): editor.IModelDecoration | undefined {
        const lineDecorations = model.getLineDecorations(lineNumber);
        const lineDecoration = lineDecorations.find((decoration) => {
            return this.decorationIds.some((id) => decoration.id === id);
        });

        return lineDecoration;
    }

    private getNewDecoration(lineNumber: number, className: string): editor.IModelDeltaDecoration {
        const range: IRange = {
            startLineNumber: lineNumber,
            startColumn: 1,
            endLineNumber: lineNumber,
            endColumn: 1
        };
        const newDecoration: editor.IModelDeltaDecoration = {
            range: range,
            options: {
                isWholeLine: true,
                className: className
            }
        };

        return newDecoration;
    }

    private updateDecorationIds(decorationId: string, existingId?: string): void {
        if (existingId) {
            this.decorationIds = this.decorationIds.map((id) => {
                return id === existingId ? decorationId : id;
            });
        } else {
            this.decorationIds.push(decorationId);
        }
    }
}
