import { Injectable, inject } from '@angular/core';
import {
    ReviewRequestCommentAmountDictionary as CommentsAmountDictionary,
    ProjectEntity,
    ReviewRequestCommentsService,
    ReviewRequestDto,
    ReviewRequestService,
    ReviewRequestSourceCodeService
} from '@code-review/shared';
import monacoLoader from '@monaco-editor/loader';
import { Observable, forkJoin, from, switchMap, tap } from 'rxjs';
import { MonacoThemeLoaderService } from '../services';
import {
    MonacoApiState,
    OpenedReviewRequestState,
    ProjectEntitiesState,
    ReviewRequestCommentAmountState
} from '../states';
import { OPENED_REVIEW_REQUEST_ID } from '../tokens';
import { MonacoApi } from '../types';

@Injectable()
export class DependenciesFacade {
    private readonly openedReviewRequestId = inject(OPENED_REVIEW_REQUEST_ID);
    private readonly reviewRequestService = inject(ReviewRequestService);
    private readonly commentsService = inject(ReviewRequestCommentsService);
    private readonly sourceCodeService = inject(ReviewRequestSourceCodeService);
    private readonly themeLoaderService = inject(MonacoThemeLoaderService);
    private readonly monacoApiState = inject(MonacoApiState);
    private readonly commentsState = inject(ReviewRequestCommentAmountState);
    private readonly projectEntitiesState = inject(ProjectEntitiesState);
    private readonly reviewRequestState = inject(OpenedReviewRequestState);

    public loadAll(): Observable<unknown> {
        return this.loadMonacoApi().pipe(
            switchMap(() =>
                forkJoin([
                    this.loadOpenedReviewRequestInfo(),
                    this.loadSourceCode(),
                    this.loadComments(),
                    this.themeLoaderService.loadAndDefine()
                ])
            )
        );
    }

    private loadMonacoApi(): Observable<MonacoApi> {
        return from(monacoLoader.init()).pipe(
            tap((monacoApi) => this.monacoApiState.set(monacoApi))
        );
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
            .pipe(tap((data) => this.reviewRequestState.set(data)));
    }
}
