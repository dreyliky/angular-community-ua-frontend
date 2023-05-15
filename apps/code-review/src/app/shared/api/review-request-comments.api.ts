import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT } from '@code-review/core';
import { Observable } from 'rxjs';
import {
    ReviewRequestComment as Comment,
    ReviewRequestCommentAmountDictionary as CommentAmountDictionary
} from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ReviewRequestCommentsApi {
    private readonly apiUrl = inject(ENVIRONMENT).backendUrl;
    private readonly http = inject(HttpClient);

    public getAll(reviewRequestId: string): Observable<Comment[]> {
        return this.http.get<Comment[]>(
            `${this.apiUrl}/review-requests/${reviewRequestId}/comments`
        );
    }

    public getAmountDictionary(
        reviewRequestId: string
    ): Observable<CommentAmountDictionary> {
        return this.http.get<CommentAmountDictionary>(
            `${this.apiUrl}/review-requests/${reviewRequestId}/comments/amount-per-files`
        );
    }
}
