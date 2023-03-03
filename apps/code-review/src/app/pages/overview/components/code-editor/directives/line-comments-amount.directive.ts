import {
    AfterViewInit,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Inject,
    Input,
    ViewContainerRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { editor, IPosition } from 'monaco-editor';
import { OverviewDataParam as DataParam } from '../../../enums';
import { MONACO_EDITOR } from '../../../tokens';
import { CommentsAmountComponent } from '../components';
import { EditorCommentMetadata } from './../interfaces';

@Directive({
    selector: '[acuaLineCommentsAmount]',
    standalone: true
})
export class LineCommentsAmountDirective implements AfterViewInit {
    @Input()
    public commentData!: EditorCommentMetadata[];

    private get model(): editor.ITextModel {
        return this.editor.getModel() as editor.ITextModel;
    }

    private get positionPreferences(): any {
        return this.route.snapshot.data[DataParam.MonacoApi].editor.ContentWidgetPositionPreference;
    }

    constructor(
        @Inject(MONACO_EDITOR)
        private readonly editor: editor.IStandaloneCodeEditor,
        private readonly route: ActivatedRoute,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly componentFactoryRef: ComponentFactoryResolver
    ) {}

    public ngAfterViewInit(): void {
        this.init();
    }

    private init(): void {
        for (const commentData of this.commentData) {
            const lineNumber = commentData.lineNumber;
            const amount = commentData.amount;

            this.applyWidgetToLine(lineNumber, amount);
        }
    }

    private async applyWidgetToLine(lineNumber: number, amount: number): Promise<void> {
        const component = await this.createWidgetComponent(amount);
        const widget = await this.createContentWidget(lineNumber, component);

        this.editor.addContentWidget(widget);
    }

    private async createWidgetComponent(
        amount: number
    ): Promise<ComponentRef<CommentsAmountComponent>> {
        const factory = this.componentFactoryRef.resolveComponentFactory(CommentsAmountComponent);
        const component = factory.create(this.viewContainerRef.injector);
        component.instance.amount = amount;

        component.changeDetectorRef.detectChanges();

        return component;
    }

    private async createContentWidget(
        lineNumber: number,
        component: ComponentRef<CommentsAmountComponent>
    ): Promise<editor.IContentWidget> {
        const endColumn = this.model.getLineMaxColumn(lineNumber);
        const position: IPosition = {
            lineNumber,
            column: endColumn
        };
        const widget: editor.IContentWidget = {
            getId: () => `comment.amount.${lineNumber}`,
            getPosition: () => ({
                position: position,
                preference: [this.positionPreferences.EXACT]
            }),
            getDomNode: () => component.location.nativeElement
        };

        return widget;
    }
}
