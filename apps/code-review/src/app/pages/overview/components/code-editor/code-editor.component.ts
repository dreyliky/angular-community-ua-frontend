import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    ViewEncapsulation
} from '@angular/core';
import type { editor } from 'monaco-editor';
import { ReviewRequestCommentsState } from '../../states';
import { MonacoApi } from '../../types';
import {
    LineCommentsAmountDirective,
    LineHighlighterDirective,
    TextSelectionDisablerDirective
} from './directives';
import { MONACO_API_PROVIDER, MONACO_EDITOR_PROVIDER } from './providers';
import { LanguageService } from './services';
import { EditorCommentsState } from './states';
import { MONACO_API, MONACO_EDITOR } from './tokens';

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
        LanguageService,
        EditorCommentsState
    ],
    encapsulation: ViewEncapsulation.None
})
export class CodeEditorComponent {
    constructor(
        @Inject(MONACO_EDITOR)
        private readonly editor: editor.IStandaloneCodeEditor,
        @Inject(MONACO_API)
        private readonly monacoApi: MonacoApi,
        private readonly languageService: LanguageService,
        private readonly reviewRequestCommentsState: ReviewRequestCommentsState,
        private readonly editorCommentsState: EditorCommentsState
    ) {}

    public openFile(fileFullPath: string, content: string): void {
        this.updateEditorLanguage(fileFullPath);
        this.editor.setValue(content);
        this.updateEditorComments(fileFullPath);
    }

    public changeLanguage(languageId: string): void {
        const editorModel = this.editor.getModel()!;

        this.monacoApi.editor.setModelLanguage(editorModel, languageId);
    }

    private updateEditorLanguage(fileFullPath: string): void {
        const languageId =
            this.languageService.getLanguageIdByFileFullPath(fileFullPath);

        this.changeLanguage(languageId);
    }

    private updateEditorComments(fileFullPath: string): void {
        const fileComments =
            this.reviewRequestCommentsState.getFileCommentsAmount(fileFullPath);

        if (fileComments) {
            this.editorCommentsState.set(fileComments);
        } else {
            this.editorCommentsState.clear();
        }
    }
}
