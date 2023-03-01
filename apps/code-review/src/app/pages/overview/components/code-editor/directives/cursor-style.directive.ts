import { Directive, Inject, OnInit, Renderer2 } from '@angular/core';
import type { editor } from 'monaco-editor';
import { MONACO_EDITOR } from '../../../tokens';

@Directive({
    selector: '[acuaCursorStyle]',
    standalone: true
})
export class CursorStyleDirective implements OnInit {
    constructor(
        @Inject(MONACO_EDITOR)
        private readonly editor: editor.IStandaloneCodeEditor,
        private readonly renderer: Renderer2
    ) {}

    public ngOnInit(): void {
        this.styleCursorToPointer(this.editor.getContainerDomNode());
    }

    private styleCursorToPointer(editorDomContainer: HTMLElement): void {
        const editorContent = editorDomContainer.querySelector(
            '.view-lines'
        ) as Element;
        this.renderer.addClass(editorContent, 'cursor-pointer');
    }
}
