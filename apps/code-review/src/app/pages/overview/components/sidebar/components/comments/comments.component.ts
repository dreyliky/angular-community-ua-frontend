import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
    ReviewRequestComment,
    ReviewRequestCommentsService
} from '@code-review/shared';
import { defer } from 'rxjs';
import { OPENED_REVIEW_REQUEST_ID } from '../../../../tokens';

@Component({
    selector: 'acua-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {
    public readonly data$ = defer(() =>
        this.commentsService.getAll(this.reviewRequestId)
    );

    private readonly reviewRequestId = inject(OPENED_REVIEW_REQUEST_ID);
    private readonly commentsService = inject(ReviewRequestCommentsService);

    public trackByFn(index: number, comment: ReviewRequestComment): string {
        return comment.id;
    }
}
