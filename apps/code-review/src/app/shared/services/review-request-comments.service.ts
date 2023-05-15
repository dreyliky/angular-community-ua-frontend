import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewRequestCommentsApi } from '../api/review-request-comments.api';
import {
    ReviewRequestComment as Comment,
    ReviewRequestCommentAmountDictionary as CommentAmountDictionary
} from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ReviewRequestCommentsService {
    constructor(private readonly commentsApi: ReviewRequestCommentsApi) {}

    public getAll(reviewRequestId: string): Observable<Comment[]> {
        return this.commentsApi.getAll(reviewRequestId);
    }

    public getAmountDictionary(
        reviewRequestId: string
    ): Observable<CommentAmountDictionary> {
        return this.commentsApi.getAmountDictionary(reviewRequestId);
    }
}
