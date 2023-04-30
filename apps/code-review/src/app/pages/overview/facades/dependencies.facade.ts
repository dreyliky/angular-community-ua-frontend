import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    ReviewRequestCommentAmountDictionary as CommentsAmountDictionary,
    ProjectEntity,
    ReviewRequestCommentsService,
    ReviewRequestDto,
    ReviewRequestService,
    ReviewRequestSourceCodeService
} from '@code-review/shared';
import { Observable, forkJoin, tap } from 'rxjs';
import { OverviewParamEnum } from '../enums';
import { MonacoThemeLoaderService } from '../services';
import {
    OpenedReviewRequestState,
    ProjectEntitiesState,
    ReviewRequestCommentsState
} from '../states';

@Injectable()
export class DependenciesFacade {
    private get openedReviewRequestId(): string {
        return this.activatedRoute.snapshot.params[OverviewParamEnum.Id];
    }

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly reviewRequestService: ReviewRequestService,
        private readonly commentsService: ReviewRequestCommentsService,
        private readonly sourceCodeService: ReviewRequestSourceCodeService,
        private readonly monacoThemeLoaderService: MonacoThemeLoaderService,
        private readonly commentsState: ReviewRequestCommentsState,
        private readonly projectEntitiesState: ProjectEntitiesState,
        private readonly openedReviewRequestState: OpenedReviewRequestState
    ) {}

    public loadAll(): Observable<unknown> {
        return forkJoin([
            this.loadOpenedReviewRequestInfo(),
            this.loadSourceCode(),
            this.loadComments(),
            this.monacoThemeLoaderService.loadAndDefine()
        ]);
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

    private loadOpenedReviewRequestInfo(): Observable<ReviewRequestDto> {
        return this.reviewRequestService
            .get(this.openedReviewRequestId)
            .pipe(tap((data) => this.openedReviewRequestState.set(data)));
    }
}
