import { Breakpoints } from '@angular/cdk/layout';
import {
    ChangeDetectorRef,
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef,
    inject
} from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription } from 'rxjs';
import { ScreenService } from '../services';

@Directive({
    selector: '[acuaAvailableForScreen]'
})
export class AvailableForScreenDirective implements OnInit {
    @Input({ required: true, alias: 'acuaAvailableForScreen' })
    public types!: Array<keyof typeof Breakpoints>;

    @Input('acuaAvailableForScreenInvert')
    public invert: boolean = false;

    private readonly screenService = inject(ScreenService);
    private readonly templateRef = inject(TemplateRef<unknown>);
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly changeDetector = inject(ChangeDetectorRef);

    public ngOnInit(): void {
        this.initBreakpointsObserver();
    }

    @AutoUnsubscribe()
    private initBreakpointsObserver(): Subscription {
        return this.screenService.isMatch$(this.types).subscribe((isMatch) => {
            this.viewContainerRef.clear();

            if (this.shouldBeRendered(isMatch)) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }

            this.changeDetector.detectChanges();
        });
    }

    private shouldBeRendered(isMatchScreenType: boolean): boolean {
        return this.invert ? !isMatchScreenType : isMatchScreenType;
    }
}
