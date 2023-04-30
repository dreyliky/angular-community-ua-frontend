import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppRouteEnum } from '@code-review/core';

@Component({
    selector: 'acua-review-request-creation-button',
    templateUrl: './review-request-creation-button.component.html',
    styleUrls: ['./review-request-creation-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewRequestCreationButtonComponent {
    protected readonly requestPageLink = `../${AppRouteEnum.Request}`;

    constructor(public readonly activatedRoute: ActivatedRoute) {}
}
