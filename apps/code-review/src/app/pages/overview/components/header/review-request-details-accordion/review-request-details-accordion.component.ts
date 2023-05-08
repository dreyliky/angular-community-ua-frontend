import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OpenedReviewRequestState } from '../../../states';

@Component({
    selector: 'acua-review-request-details-accordion',
    templateUrl: './review-request-details-accordion.component.html',
    styleUrls: ['./review-request-details-accordion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewRequestDetailsAccordionComponent {
    protected readonly openedReviewRequest$ =
        this.openedReviewRequestState.data$;

    constructor(
        private readonly openedReviewRequestState: OpenedReviewRequestState
    ) {}
}
