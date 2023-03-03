import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Inject,
    ViewEncapsulation
} from '@angular/core';
import type { editor } from 'monaco-editor';
import { MONACO_EDITOR } from '../../tokens';
import {
    CursorStyleDirective,
    LineCommentsAmountDirective,
    LineHighlighterDirective
} from './directives';
import { MONACO_EDITOR_PROVIDER } from './providers';

@Component({
    selector: 'acua-code-editor',
    template: '',
    styleUrls: ['./code-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [
        {
            directive: LineHighlighterDirective,
            // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
            inputs: ['commentData']
        },
        {
            directive: LineCommentsAmountDirective,
            // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
            inputs: ['commentData']
        },
        CursorStyleDirective
    ],
    providers: [MONACO_EDITOR_PROVIDER],
    encapsulation: ViewEncapsulation.None
})
export class CodeEditorComponent implements AfterViewInit {
    constructor(
        @Inject(MONACO_EDITOR)
        private readonly editor: editor.IStandaloneCodeEditor
    ) {}

    public ngAfterViewInit(): void {
        this.editor.layout();
    }

    public setValue(code: string): void {
        this.editor.setValue(code);
    }
}
