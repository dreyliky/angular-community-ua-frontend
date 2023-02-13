import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef
} from '@angular/core';
import * as monaco from 'monaco-editor';

@Component({
    selector: 'acua-code-editor',
    template: '',
    styleUrls: ['./code-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeEditorComponent implements AfterViewInit {
    public editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
        theme: 'vs-dark',
        language: 'typescript',
        fontSize: 16
    };

    private editor!: monaco.editor.IStandaloneCodeEditor;

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {}

    public ngAfterViewInit(): void {
        this.editor = monaco.editor.create(this.hostRef.nativeElement, this.editorOptions);
    }

    public setValue(code: string): void {
        this.editor.setValue(code);
    }
}
