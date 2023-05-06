import {
    ChangeDetectorRef,
    Directive,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/services/user.service';

@Directive({
    selector: '[acuaForAuthorizedOnly]'
})
export class AvailableForAuthorizedOnlyDirective implements OnInit {
    constructor(
        private readonly userService: UserService,
        private readonly templateRef: TemplateRef<unknown>,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initUserObserver();
    }

    @AutoUnsubscribe()
    private initUserObserver(): Subscription {
        return this.userService.data$.subscribe((user) => {
            if (user) {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainerRef.clear();
            }

            this.changeDetector.detectChanges();
        });
    }
}
