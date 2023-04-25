import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppRouteEnum } from '@code-review/core';
import { ReviewRequestDto } from '@code-review/shared';

@Component({
    selector: 'acua-review-request-card',
    templateUrl: './review-request-card.component.html',
    styleUrls: ['./review-request-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewRequestCardComponent {
    @Input()
    public data!: ReviewRequestDto;

    public get reviewPageLink(): string {
        return `../${AppRouteEnum.Overview}/${this.data.id}`;
    }

    constructor(public readonly activatedRoute: ActivatedRoute) {}
}
