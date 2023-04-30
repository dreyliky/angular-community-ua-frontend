import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/services/user.service';

@Directive({
    selector: '[acuaForUnauthorizedOnly]'
})
export class AvailableForUnauthorizedOnlyDirective implements OnInit {
    constructor(
        private readonly userService: UserService,
        private readonly templateRef: TemplateRef<unknown>,
        private readonly viewContainerRef: ViewContainerRef
    ) {}

    public ngOnInit(): void {
        this.initUserObserver();
    }

    @AutoUnsubscribe()
    private initUserObserver(): Subscription {
        return this.userService.data$.subscribe((user) => {
            if (!user) {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef).detectChanges();
            } else {
                this.viewContainerRef.clear();
            }
        });
    }
}
