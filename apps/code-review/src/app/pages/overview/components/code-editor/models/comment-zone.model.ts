import { ComponentRef, Injector, ViewContainerRef } from '@angular/core';
import type { editor } from 'monaco-editor';
import { CommentComponent } from '../components';

export class CommentZone implements editor.IViewZone {
    public heightInPx!: number;

    private readonly componentRef = this.createComponentRef();

    public get domNode(): HTMLElement {
        return this.componentRef.location.nativeElement;
    }

    constructor(
        public afterLineNumber: number,
        private commentData: any,
        private injector: Injector
    ) {
        this.heightInPx = this.domNode.offsetHeight;
    }

    private createComponentRef(): ComponentRef<CommentComponent> {
        const viewContainerRef = this.injector.get(ViewContainerRef);
        const component = viewContainerRef.createComponent(
            CommentComponent
        );
        component.instance.amount = this.commentData;

        component.changeDetectorRef.detectChanges();

        return component;
    }
}
