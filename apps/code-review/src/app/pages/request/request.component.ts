import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteEnum } from '@code-review/core';
import { RequestForm } from './forms';
import { LinkValidateValidator } from './validators';

@Component({
    selector: 'acua-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RequestForm, LinkValidateValidator]
})
export class RequestComponent {
    constructor(
        private readonly requestForm: RequestForm,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {}

    protected get isRequestCreationButtonDisabled(): boolean {
        return !this.requestForm?.valid;
    }

    protected onRequestCreationButtonClick(): void {
        this.router.navigate(['../', AppRouteEnum.Overview], {
            relativeTo: this.route
        });
    }
}
