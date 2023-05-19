import { Inject, Injectable } from '@angular/core';
import type { editor } from 'monaco-editor';
import { ReviewRequestCommentAmountService } from '../../../services';
import { MonacoApi } from '../../../types';
import { EditorCommentsState } from '../states';
import { MONACO_API, MONACO_EDITOR } from '../tokens';
import { LanguageService } from './language.service';

@Injectable()
export class EditorService {
    constructor(
        @Inject(MONACO_EDITOR)
        private readonly editor: editor.IStandaloneCodeEditor,
        @Inject(MONACO_API)
        private readonly monacoApi: MonacoApi,
        private readonly languageService: LanguageService,
        private readonly commentAmountService: ReviewRequestCommentAmountService,
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
        const filesComments =
            this.commentAmountService.getForFileLines(fileFullPath);

        if (filesComments) {
            this.editorCommentsState.set(filesComments);
        } else {
            this.editorCommentsState.clear();
        }
    }
}
