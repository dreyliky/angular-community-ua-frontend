import {
    Directive,
    ElementRef,
    EventEmitter, OnInit,
    Output,
    Renderer2
} from '@angular/core';
import loader from '@monaco-editor/loader';
import type { editor, IPosition, IRange } from 'monaco-editor';

@Directive({
    selector: '[acuaMonacoEditor]'
})
export class MonacoEditorDirective implements OnInit {
    @Output()
    public monacoReady = new EventEmitter<editor.IStandaloneCodeEditor>();

    public editorOptions: editor.IStandaloneEditorConstructionOptions = {
        theme: 'vs-dark',
        language: 'typescript',
        fontSize: 16,
        domReadOnly: true,
        readOnly: true,
        contextmenu: false
    };

    private monacoEditor!: typeof editor;
    private mouseTargetTypes!: typeof editor.MouseTargetType;
    private editor!: editor.IStandaloneCodeEditor;

    private readonly decorationIds: string[] = [];
    private readonly widgets: editor.IContentWidget[] = [];

    public get currentModel(): editor.ITextModel | null {
        return this.editor.getModel();
    }

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>,
        private readonly renderer: Renderer2
    ) {}

    public ngOnInit(): void {
        this.init();
    }

    public setValue(code: string): void {
        this.editor.setValue(code);
    }

    public setLanguage(model: editor.ITextModel, languageId: string): void {
        this.monacoEditor.setModelLanguage(model, languageId);
    }

    private async init(): Promise<void> {
        const monaco = await loader.init();
        this.editor = monaco.editor.create(
            this.hostRef.nativeElement,
            this.editorOptions
        );
        this.monacoEditor = monaco.editor;
        this.mouseTargetTypes = monaco.editor.MouseTargetType;
        const model = this.currentModel as editor.ITextModel;
        const editorDomContainer = this.editor.getContainerDomNode();
        this.styleCursorToPointer(editorDomContainer);

        this.registerEditorListeners(model);

        this.monacoReady.emit(this.editor);
    }

    private registerEditorListeners(model: editor.ITextModel): void {
        this.editor.onMouseMove((e) => this.initEditorEffects(model, e));
        this.editor.onMouseLeave(() => this.removeEditorEffects(model));
        this.editor.onMouseDown((e) => console.log(e));
        this.editor.onDidChangeModel((e) => console.log(e)); // In order to react to changes in tree
    }

    private initEditorEffects(
        model: editor.ITextModel,
        event: editor.IEditorMouseEvent
    ): void {
        const decorations = this.createDecorationsToLine(event);
        this.applyDecorationsToLine(model, event, decorations);

        const commentCounterWidget = this.createCommentCounterWidget(model, event);
        this.applyWidgetToLine(model, event, commentCounterWidget);
    }

    private removeEditorEffects(model: editor.ITextModel): void {
        this.removeDecorations(model);
        this.removeContentWidgets();
    }

    private createDecorationsToLine(
        event: editor.IEditorMouseEvent
    ): editor.IModelDeltaDecoration[] {
        const decorations = [];
        const selectionDecoration = this.getSelectionDecoration(event);

        decorations.push(selectionDecoration);

        return decorations;
    }

    // eslint-disable-next-line max-lines-per-function
    private createCommentCounterWidget(
        model: editor.ITextModel,
        event: editor.IEditorMouseEvent
    ): editor.IContentWidget {
        const lineNumber = event.target.position?.lineNumber as number;
        const endColumn = model.getLineLength(lineNumber);

        const position: IPosition = {
            lineNumber,
            column: endColumn
        };

        const widget: editor.IContentWidget = {
            getId: () => 'comment.counter',
            getPosition: () => ({
                position: position,
                preference: [
                    this.monacoEditor.ContentWidgetPositionPreference.EXACT
                ]
            }),
            getDomNode: () => {
                // Here, It should be comment counter component instead
                const counterContainerElement = this.renderer.createElement('div');
                const counterInnerElement = this.renderer.createElement('p');
                counterInnerElement.innerHTML = '0';
                this.renderer.addClass(counterContainerElement, 'counter');
                this.renderer.addClass(counterInnerElement, 'counter-text');
                this.renderer.appendChild(counterContainerElement, counterInnerElement);

                return counterContainerElement;
            }
        };

        return widget;
    }

    private applyDecorationsToLine(
        model: editor.ITextModel,
        event: editor.IEditorMouseEvent,
        decorations: editor.IModelDeltaDecoration[]
    ): void {
        this.removeDecorations(model);

        if (!this.checkWhetherLineWithCode(model, event.target)) {
            return;
        }

        const decorationIds = this.setDecorationToLine(model, decorations);
        this.decorationIds.push(...decorationIds);
    }

    private applyWidgetToLine(
        model: editor.ITextModel,
        event: editor.IEditorMouseEvent,
        widget: editor.IContentWidget
    ): void {
        this.removeContentWidgets();

        if (!this.checkWhetherLineWithCode(model, event.target)) {
            return;
        }

        this.widgets.push(widget);

        this.editor.addContentWidget(widget);
    }

    private getSelectionDecoration(event: editor.IEditorMouseEvent): editor.IModelDeltaDecoration {
        const range = event.target.range as IRange;

        return {
            range: range,
            options: {
                isWholeLine: true,
                className: 'selected-line'
            }
        };
    }

    private getCodeLineElement(
        model: editor.ITextModel,
        event: editor.IEditorMouseEvent
    ): Element | void {
        if (!this.checkWhetherLineWithCode(model, event.target)) {
            return;
        }

        const lineNumber = event.target.position?.lineNumber as number;
        const lineElement = this.editor.getContainerDomNode()
            .querySelector(`.view-lines > .view-line:nth-child(${lineNumber})`) as Element;

        return lineElement;
    }

    private setDecorationToLine(
        model: editor.ITextModel,
        newDecorations: editor.IModelDeltaDecoration[]
    ): string[] {
        return model.deltaDecorations(
            [],
            newDecorations
        );
    }

    private removeDecorations(model: editor.ITextModel): void {
        model.deltaDecorations(this.decorationIds, []);

        if (this.decorationIds.length > 0) {
            this.decorationIds.length = 0;
        }
    }

    private removeContentWidgets(): void {
        if (this.widgets.length === 0) {
            return;
        }

        for (const widget of this.widgets) {
            this.editor.removeContentWidget(widget);
        }

        this.widgets.length = 0;
    }

    private checkWhetherLineWithCode(
        model: editor.ITextModel,
        eventTarget: editor.IMouseTarget
    ): boolean {
        const target = eventTarget as any;
        const targetDetails = target.detail;
        const lineNumber = eventTarget.position?.lineNumber as number;
        const lineLength = model.getLineLength(lineNumber);

        return !targetDetails.isAfterLines && lineLength > 0;
    }

    private styleCursorToPointer(editorDomContainer: HTMLElement): void {
        const editorContent = editorDomContainer.querySelector('.view-lines') as Element;
        this.renderer.addClass(editorContent, 'cursor-pointer');
    }
}
