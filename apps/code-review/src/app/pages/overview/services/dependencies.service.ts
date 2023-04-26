import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    ReviewRequestCommentAmountDictionary as CommentsAmountDictionary,
    ProjectEntity,
    ReviewRequestCommentsService,
    ReviewRequestSourceCodeService
} from '@code-review/shared';
import { Observable, forkJoin, tap } from 'rxjs';
import { OverviewParamEnum } from '../enums';
import { ReviewRequestCommentsState } from '../states';

@Injectable()
export class DependenciesService {
    private get openedReviewRequestId(): string {
        return this.activatedRoute.snapshot.params[OverviewParamEnum.Id];
    }

    constructor(
        private readonly commentsService: ReviewRequestCommentsService,
        private readonly commentsState: ReviewRequestCommentsState,
        private readonly activatedRoute: ActivatedRoute,
        private readonly sourceCodeService: ReviewRequestSourceCodeService
    ) {}

    public loadComments(): Observable<CommentsAmountDictionary> {
        return this.commentsService
            .getAmountDictionary(this.openedReviewRequestId)
            .pipe(tap((comments) => this.commentsState.set(comments)));
    }

    public loadSourceCode(): Observable<ProjectEntity[]> {
        return this.sourceCodeService.get(this.openedReviewRequestId);
    }

    public load(): Observable<unknown> {
        return forkJoin([this.loadSourceCode(), this.loadComments()]);
    }
}
