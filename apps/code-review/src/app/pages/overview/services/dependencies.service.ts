import { Injectable } from '@angular/core';
import { ReviewRequestCommentsState } from '../states';
import { ActivatedRouteSnapshot } from '@angular/router';
import {
    ReviewRequestCommentAmountDictionary as CommentsAmountDictionary,
    ReviewRequestCommentsService
} from '@code-review/shared';
import { MonacoTreeNode, ProjectSourceUrlService } from '@code-review/shared';
import { Observable, tap } from 'rxjs';
import { OverviewParamEnum } from '../enums';

@Injectable()
export class DependenciesService {
    constructor(
        private readonly projectSourceUrlService: ProjectSourceUrlService,
        private readonly commentsService: ReviewRequestCommentsService,
        private readonly commentsState: ReviewRequestCommentsState
    ) {}

    public Comments(route: ActivatedRouteSnapshot): Observable<CommentsAmountDictionary> {
        const reviewRequestId = route.paramMap.get(OverviewParamEnum.Id) as string;

        return this.commentsService
            .getAmountDictionary(reviewRequestId)
            .pipe(tap((comments) => this.commentsState.set(comments)));
    }

    public SourceCode(): Observable<MonacoTreeNode[]> {
        return this.projectSourceUrlService.getSource(
            'https%3A%2F%2Fgithub.com%2Fdreyliky%2Fangular-community-ua-frontend'
        );
    }
}
