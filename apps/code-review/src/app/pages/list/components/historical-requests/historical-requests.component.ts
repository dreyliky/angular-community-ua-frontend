import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReviewRequestsService } from '@code-review/shared';

@Component({
    selector: 'acua-historical-requests',
    templateUrl: './historical-requests.component.html',
    styleUrls: ['./historical-requests.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoricalRequestsComponent {
    public readonly reviewRequests$ = this.reviewRequestsService.getAll();

    constructor(private readonly reviewRequestsService: ReviewRequestsService) {}
}
