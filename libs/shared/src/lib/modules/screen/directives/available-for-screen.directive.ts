import { Breakpoints } from '@angular/cdk/layout';
import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription } from 'rxjs';
import { ScreenService } from '../services';

@Directive({
    selector: '[acuaAvailableForScreen]'
})
export class AvailableForScreenDirective implements OnInit {
    @Input('acuaAvailableForScreen')
    public types!: Array<keyof typeof Breakpoints>;

    @Input('acuaAvailableForScreenInvert')
    public invert: boolean = false;

    constructor(
        private readonly screenService: ScreenService,
        private readonly templateRef: TemplateRef<unknown>,
        private readonly viewContainerRef: ViewContainerRef
    ) {}

    public ngOnInit(): void {
        this.initBreakpointsObserver();
    }

    @AutoUnsubscribe()
    private initBreakpointsObserver(): Subscription {
        return this.screenService.isMatch$(this.types).subscribe((isMatch) => {
            if (this.shouldBeRendered(isMatch)) {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef).detectChanges();
            } else {
                this.viewContainerRef.clear();
            }
        });
    }

    private shouldBeRendered(isMatchScreenType: boolean): boolean {
        return this.invert ? !isMatchScreenType : isMatchScreenType;
    }
}
