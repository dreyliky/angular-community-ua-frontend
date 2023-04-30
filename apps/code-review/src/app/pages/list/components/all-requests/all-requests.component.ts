import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeReviewRequestStatusEnum, ReviewRequestService } from '@code-review/shared';

@Component({
    selector: 'acua-all-requests',
    templateUrl: './all-requests.component.html',
    styleUrls: ['./all-requests.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllRequestsComponent {
    public readonly reviewRequests$ = this.reviewRequestsService.getAllWithStatus(
        CodeReviewRequestStatusEnum.Opened
    );

    constructor(private readonly reviewRequestsService: ReviewRequestService) {}
}
