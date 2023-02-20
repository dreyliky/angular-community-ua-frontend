import {
    Directive,
    ElementRef,
    EventEmitter, OnInit,
    Output,
    Renderer2
} from '@angular/core';
import loader from '@monaco-editor/loader';
import type { editor, IRange } from 'monaco-editor';

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

    private readonly decorations: string[] = [];

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
        this.editor.onMouseMove((e) => this.applySelectionToLine(model, e));
        this.editor.onMouseLeave(() => this.removeDecorations(model));
        this.editor.onMouseDown((e) => {
            console.log(this.getCodeLineElement(model, e));
        });
        this.editor.onDidChangeModel((e) => console.log(e)); // In order to react to changes in tree
    }

    private applySelectionToLine(model: editor.ITextModel, event: editor.IEditorMouseEvent): void {
        this.removeDecorations(model);

        if (!this.checkWhetherLineWithCode(model, event.target)) {
            return;
        }

        const eventRange = event.target.range as IRange;

        const decoration = this.setDecorationToLine(model, eventRange);
        this.decorations.push(decoration[0]);
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

    private setDecorationToLine(model: editor.ITextModel, range: IRange): string[] {
        return model.deltaDecorations(
            [],
            [
                {
                    range: range,
                    options: {
                        isWholeLine: true,
                        className: 'selected-line'
                    }
                }
            ]
        );
    }

    private removeDecorations(model: editor.ITextModel): void {
        model.deltaDecorations(this.decorations, []);
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
