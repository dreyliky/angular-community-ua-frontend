import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReviewRequestsService } from '@code-review/shared';

@Component({
    selector: 'acua-my-requests',
    templateUrl: './my-requests.component.html',
    styleUrls: ['./my-requests.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyRequestsComponent {
    public readonly reviewRequests$ = this.reviewRequestsService.getAll();

    constructor(private readonly reviewRequestsService: ReviewRequestsService) {}
}
