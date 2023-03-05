import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    ViewEncapsulation
} from '@angular/core';
import type { editor } from 'monaco-editor';
import { ReviewRequestCommentsState } from '../../states';
import { MONACO_EDITOR } from '../../tokens';
import {
    LineCommentsAmountDirective,
    LineHighlighterDirective,
    TextSelectionDisablerDirective
} from './directives';
import { MONACO_API_PROVIDER, MONACO_EDITOR_PROVIDER } from './providers';
import { EditorCommentsState } from './states';

@Component({
    selector: 'acua-code-editor',
    template: '',
    styleUrls: ['./code-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [
        LineHighlighterDirective,
        LineCommentsAmountDirective,
        TextSelectionDisablerDirective
    ],
    providers: [
        MONACO_EDITOR_PROVIDER,
        MONACO_API_PROVIDER,
        EditorCommentsState
    ],
    encapsulation: ViewEncapsulation.None
})
export class CodeEditorComponent {
    constructor(
        @Inject(MONACO_EDITOR)
        private readonly editor: editor.IStandaloneCodeEditor,
        private readonly reviewRequestCommentsState: ReviewRequestCommentsState,
        private readonly editorCommentsState: EditorCommentsState
    ) {}

    public openFile(fileFullPath: string, content: string): void {
        const fileComments =
            this.reviewRequestCommentsState.getFileCommentsAmount(fileFullPath);

        this.editorCommentsState.set(fileComments);
        this.editor.setValue(content);
    }
}
