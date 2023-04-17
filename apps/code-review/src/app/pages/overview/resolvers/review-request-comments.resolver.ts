import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import {
    ReviewRequestCommentAmountDictionary as CommentsAmountDictionary,
    ReviewRequestCommentsService
} from '@code-review/shared';
import { Observable, tap } from 'rxjs';
import { OverviewParamEnum } from '../enums';
import { ReviewRequestCommentsState } from '../states';

@Injectable()
export class ReviewRequestCommentsResolver implements Resolve<CommentsAmountDictionary> {
    constructor(
        private readonly commentsService: ReviewRequestCommentsService,
        private readonly commentsState: ReviewRequestCommentsState
    ) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<CommentsAmountDictionary> {
        const reviewRequestId = route.paramMap.get(OverviewParamEnum.Id) as string;

        return this.commentsService
            .getAmountDictionary(reviewRequestId)
            .pipe(tap((comments) => this.commentsState.set(comments)));
    }
}
