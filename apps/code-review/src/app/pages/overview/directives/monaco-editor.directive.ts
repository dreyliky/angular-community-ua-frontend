import {
    Directive,
    ElementRef,
    EventEmitter,
    OnInit,
    Output
} from '@angular/core';
import loader from '@monaco-editor/loader';
import type { editor } from 'monaco-editor';

@Directive({
    selector: '[acuaMonacoEditor]'
})
export class MonacoEditorDirective implements OnInit {
    @Output()
    public monacoReady = new EventEmitter<editor.IStandaloneCodeEditor>();

    public editorOptions: editor.IStandaloneEditorConstructionOptions = {
        theme: 'vs-dark',
        language: 'typescript',
        fontSize: 16
    };

    private editor!: editor.IStandaloneCodeEditor;

    constructor(private readonly hostRef: ElementRef<HTMLElement>) {}

    public ngOnInit(): void {
        this.init();
    }

    public setValue(code: string): void {
        this.editor.setValue(code);
    }

    private async init(): Promise<void> {
        const monaco = await loader.init();
        this.editor = monaco.editor.create(
            this.hostRef.nativeElement,
            this.editorOptions
        );

        this.monacoReady.emit(this.editor);
    }
}
