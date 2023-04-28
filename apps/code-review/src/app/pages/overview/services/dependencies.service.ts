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
import { ProjectEntitiesState, ReviewRequestCommentsState } from '../states';

@Injectable()
export class DependenciesService {
    private get openedReviewRequestId(): string {
        return this.activatedRoute.snapshot.params[OverviewParamEnum.Id];
    }

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly commentsService: ReviewRequestCommentsService,
        private readonly sourceCodeService: ReviewRequestSourceCodeService,
        private readonly commentsState: ReviewRequestCommentsState,
        private readonly projectEntitiesState: ProjectEntitiesState
    ) {}

    public loadAll(): Observable<unknown> {
        return forkJoin([this.loadSourceCode(), this.loadComments()]);
    }

    private loadComments(): Observable<CommentsAmountDictionary> {
        return this.commentsService
            .getAmountDictionary(this.openedReviewRequestId)
            .pipe(tap((comments) => this.commentsState.set(comments)));
    }

    private loadSourceCode(): Observable<ProjectEntity[]> {
        return this.sourceCodeService
            .get(this.openedReviewRequestId)
            .pipe(tap((data) => this.projectEntitiesState.set(data)));
    }
}
