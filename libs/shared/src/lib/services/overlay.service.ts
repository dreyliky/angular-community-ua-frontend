import { Overlay, OverlayConfig, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';

@Injectable()
export class OverlayService {
    public get reference(): OverlayRef | null {
        return this._reference;
    }

    private readonly config: OverlayConfig = {
        hasBackdrop: true,
        disposeOnNavigation: true,
        minWidth: '100%',
        minHeight: '100%',
        backdropClass: 'acua-overlay-backdrop',
        panelClass: 'acua-overlay'
    };

    private _reference: OverlayRef | null = null;

    constructor(
        private readonly overlay: Overlay,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly positionBuilder: OverlayPositionBuilder
    ) {}

    public open(templateRef: TemplateRef<unknown>): void {
        const templatePortal = new TemplatePortal(templateRef, this.viewContainerRef);
        this._reference = this.overlay.create(this.config);

        this._reference.attach(templatePortal);
    }

    public close(): void {
        this._reference?.detach();

        this._reference = null;
    }
}
