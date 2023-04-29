import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OpenedReviewRequestState } from '../../../states';

@Component({
    selector: 'acua-review-request-details-window',
    templateUrl: './review-request-details-window.component.html',
    styleUrls: ['./review-request-details-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewRequestDetailsWindowComponent {
    protected readonly openedReviewRequest$ = this.openedReviewRequestState.data$;

    constructor(private readonly openedReviewRequestState: OpenedReviewRequestState) {}
}
