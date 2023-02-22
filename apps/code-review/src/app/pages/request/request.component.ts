import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteEnum } from '@code-review/core';
import { RequestForm } from './forms';

@Component({
    selector: 'acua-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RequestForm]
})
export class RequestComponent {
    constructor(
        private readonly requestForm: RequestForm,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {}

    protected get disabled(): boolean {
        return !this.requestForm?.valid;
    }

    protected onRequestCreationButtonClick(): void {
        this.router.navigate(['../', AppRouteEnum.Overview], {
            relativeTo: this.route
        });
    }
}
