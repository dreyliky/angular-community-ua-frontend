import {
    Directive,
    ElementRef,
    EventEmitter,
    OnInit,
    Output
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
        private readonly hostRef: ElementRef<HTMLElement>
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
        this.editor = monaco.editor.create(this.hostRef.nativeElement, this.editorOptions);
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
        this.editor.onMouseDown((e) => console.log(this.getCodeLineTarget(e)));
        this.editor.onDidChangeModel((e) => console.log(e)); // In order to react to changes in tree
    }

    private applySelectionToLine(model: editor.ITextModel, event: editor.IEditorMouseEvent): void {
        const targetType = event.target.type;

        if (!this.checkWhetherLineIsCode(targetType)) {
            this.removeDecorations(model);

            return;
        }
        const lineNumber = event.target.position?.lineNumber as number;
        const eventRange = event.target.range as IRange;
        const range: IRange = {
            ...eventRange,
            startColumn: 1,
            endColumn: model.getLineMaxColumn(lineNumber)
        };
        const decor = this.setDecorationToLine(model, range);
        this.decorations.push(decor[0]);
    }

    private getCodeLineTarget(event: editor.IEditorMouseEvent): editor.IMouseTarget | null {
        const targetType = event.target.type;

        if (!this.checkWhetherLineIsCode(targetType)) {
            return null;
        }

        return event.target;
    }

    private setDecorationToLine(model: editor.ITextModel, range: IRange): string[] {
        return model.deltaDecorations(
            [],
            [
                {
                    range: range,
                    options: {
                        className: 'selected-line'
                    }
                }
            ]
        );
    }

    private removeDecorations(model: editor.ITextModel): void {
        model.deltaDecorations(this.decorations, []);
    }

    private checkWhetherLineIsCode(targetType: editor.MouseTargetType): boolean {
        return targetType === this.mouseTargetTypes.CONTENT_TEXT;
    }

    private styleCursorToPointer(editorDomContainer: HTMLElement): void {
        const editorContent = editorDomContainer.querySelector('.view-lines') as Element;

        editorContent.classList.add('cursor-pointer');
    }
}
