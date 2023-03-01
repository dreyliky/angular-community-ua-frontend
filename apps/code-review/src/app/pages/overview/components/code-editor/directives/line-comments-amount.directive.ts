import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Inject, ViewContainerRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { editor, IPosition } from 'monaco-editor';
import { OverviewDataParam as DataParam } from '../../../enums';
import { MONACO_EDITOR } from '../../../tokens';
import { CommentsAmountComponent } from '../components';
import { whetherLineWithCode } from '../helpers';

@Directive({
    selector: '[acuaLineCommentsAmount]',
    standalone: true
})
export class LineCommentsAmountDirective {
    private model: editor.ITextModel = this.editor.getModel() as editor.ITextModel;

    private widget!: editor.IContentWidget | null;
    private widgetComponent!: ComponentRef<CommentsAmountComponent> | null;
    private lastLineNumber!: number | undefined;

    private get positionPreferences(): any {
        return this.route.snapshot.data[DataParam.MonacoApi].editor.ContentWidgetPositionPreference;
    }

    constructor(
        @Inject(MONACO_EDITOR)
        private readonly editor: editor.IStandaloneCodeEditor,
        private readonly route: ActivatedRoute,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly componentFactoryRef: ComponentFactoryResolver
    ) {
        this.init();
    }

    private init(): void {
        this.editor.onMouseMove((e) => {
            this.applyWidgetToLine(e);
        });
        this.editor.onMouseLeave(() => this.clearWidget());
    }

    private applyWidgetToLine(event: editor.IEditorMouseEvent): void {
        if (!this.isLineHoverSwitched(event.target)) {
            return;
        }

        this.clearWidget();

        if (!whetherLineWithCode(this.model, event.target)) {
            return;
        }

        const component = this.createWidgetComponent();
        const widget = this.createContentWidget(event, component);

        this.widgetComponent = component;
        this.widget = widget;

        this.editor.addContentWidget(this.widget);
    }

    // eslint-disable-next-line max-lines-per-function
    private createContentWidget(
        event: editor.IEditorMouseEvent,
        component: ComponentRef<CommentsAmountComponent>
    ): editor.IContentWidget {
        const lineNumber = event.target.position?.lineNumber as number;
        const endColumn = this.model.getLineLength(lineNumber);
        const position: IPosition = {
            lineNumber,
            column: endColumn
        };
        const widget: editor.IContentWidget = {
            getId: () => 'comment.counter',
            getPosition: () => ({
                position: position,
                preference: [
                    this.positionPreferences.EXACT
                ]
            }),
            getDomNode: () => {
                return component.location.nativeElement;
            }
        };
        console.log('created');
        this.lastLineNumber = lineNumber;

        return widget;
    }

    private createWidgetComponent(): ComponentRef<CommentsAmountComponent> {
        const factory = this.componentFactoryRef.resolveComponentFactory(CommentsAmountComponent);
        const component = factory.create(this.viewContainerRef.injector);
        component.instance.amount = 5;

        component.changeDetectorRef.detectChanges();

        return component;
    }

    private clearWidget(): void {
        this.lastLineNumber = 0;

        if (!this.widget) {
            return;
        }

        this.editor.removeContentWidget(this.widget);
        this.widget = null;

        if (!this.widgetComponent) {
            return;
        }

        this.widgetComponent.destroy();
        this.widgetComponent = null;
    }

    private isLineHoverSwitched(target: editor.IMouseTarget): boolean {
        const lineNumber = target.position?.lineNumber as number;
        const lineMatch = this.lastLineNumber === lineNumber;
        const _target = target as any;
        const details = _target.detail;

        return !lineMatch || details.isAfterLines;
    }
}
