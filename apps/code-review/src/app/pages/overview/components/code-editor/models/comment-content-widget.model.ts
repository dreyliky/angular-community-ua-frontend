import { ComponentRef, Injector, ViewContainerRef } from '@angular/core';
import type { editor } from 'monaco-editor';
import { CommentsAmountComponent } from '../components';
import { EditorCommentsState } from '../states';
import { MONACO_API, MONACO_EDITOR } from '../tokens';

export class CommentContentWidget implements editor.IContentWidget {
    private readonly editor = this.injector.get(MONACO_EDITOR);
    private readonly monacoApi = this.injector.get(MONACO_API);
    private readonly componentRef = this.createComponentRef();

    private readonly position: editor.IContentWidgetPosition = {
        position: {
            lineNumber: this.lineNumber,
            column: this.editorModel.getLineMaxColumn(this.lineNumber)
        },
        preference: [this.positionPreferences.EXACT]
    };

    private get editorModel(): editor.ITextModel {
        return this.editor.getModel() as editor.ITextModel;
    }

    private get positionPreferences(): typeof editor.ContentWidgetPositionPreference {
        return this.monacoApi.editor.ContentWidgetPositionPreference;
    }

    constructor(private readonly lineNumber: number, private readonly injector: Injector) {}

    public getId(): string {
        return `comment.amount.${this.lineNumber}`;
    }

    public getDomNode(): HTMLElement {
        return this.componentRef.location.nativeElement;
    }

    public getPosition(): editor.IContentWidgetPosition {
        return this.position;
    }

    private getCommentsAmount(): number {
        const commentsState = this.injector.get(EditorCommentsState);

        return commentsState.getAmount(this.lineNumber);
    }

    private createComponentRef(): ComponentRef<CommentsAmountComponent> {
        const viewContainerRef = this.injector.get(ViewContainerRef);
        const component = viewContainerRef.createComponent(CommentsAmountComponent);
        component.instance.amount = this.getCommentsAmount();

        component.changeDetectorRef.detectChanges();

        return component;
    }
}
