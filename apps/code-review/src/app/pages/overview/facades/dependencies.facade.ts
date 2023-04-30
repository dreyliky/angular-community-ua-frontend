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
import monacoLoader from '@monaco-editor/loader';
import { Observable, forkJoin, from, switchMap, tap } from 'rxjs';
import { OverviewParamEnum } from '../enums';
import { MonacoThemeLoaderService } from '../services';
import {
    MonacoApiState,
    OpenedReviewRequestState,
    ProjectEntitiesState,
    ReviewRequestCommentsState
} from '../states';
import { MonacoApi } from '../types';

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
        private readonly monacoApiState: MonacoApiState,
        private readonly commentsState: ReviewRequestCommentsState,
        private readonly projectEntitiesState: ProjectEntitiesState,
        private readonly openedReviewRequestState: OpenedReviewRequestState
    ) {}

    public loadAll(): Observable<unknown> {
        return this.loadMonacoApi().pipe(
            switchMap(() =>
                forkJoin([
                    this.loadOpenedReviewRequestInfo(),
                    this.loadSourceCode(),
                    this.loadComments(),
                    this.monacoThemeLoaderService.loadAndDefine()
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
            .pipe(tap((data) => this.openedReviewRequestState.set(data)));
    }
}
