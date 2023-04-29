import { OverlayService, markControlAsTouchedAndValidate } from '@acua/shared';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteEnum } from '@code-review/core';
import { ReviewRequestService } from '@code-review/shared';
import { Observable, map, startWith, tap } from 'rxjs';
import { RequestForm } from '../../forms';

@Component({
    selector: 'acua-creation-button',
    templateUrl: './creation-button.component.html',
    styleUrls: ['./creation-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OverlayService]
})
export class CreationButtonComponent {
    protected reviewRequestCreation$: Observable<unknown> | null = null;

    protected readonly isDisabled$ = this.requestForm.statusChanges.pipe(
        map((status) => status !== 'VALID'),
        startWith(true)
    );

    constructor(
        protected readonly overlay: OverlayService,
        private readonly requestForm: RequestForm,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly reviewRequestService: ReviewRequestService
    ) {}

    protected onClick(): void {
        if (this.requestForm.valid) {
            this.reviewRequestCreation$ = this.getReviewRequestCreationObservable();
        } else {
            markControlAsTouchedAndValidate(this.requestForm);
        }
    }

    private getReviewRequestCreationObservable(): Observable<unknown> {
        const creationDto = this.requestForm.getRawValue();

        return this.reviewRequestService
            .create(creationDto)
            .pipe(tap(({ id }) => this.navigateToOverviewPage(id)));
    }

    private navigateToOverviewPage(reviewRequestId: string): void {
        this.router.navigate(['../', AppRouteEnum.Overview, reviewRequestId], {
            relativeTo: this.route
        });
    }
}
