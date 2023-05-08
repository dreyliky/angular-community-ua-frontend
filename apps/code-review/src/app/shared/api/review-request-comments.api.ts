import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT } from '@code-review/core';
import { Observable } from 'rxjs';
import { ReviewRequestCommentAmountDictionary as CommentAmountDictionary } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ReviewRequestCommentsApi {
    private readonly apiUrl = inject(ENVIRONMENT).backendUrl;
    private readonly http = inject(HttpClient);

    public getAmountDictionary(
        reviewRequestId: string
    ): Observable<CommentAmountDictionary> {
        return this.http.get<CommentAmountDictionary>(
            `${this.apiUrl}/review-requests/${reviewRequestId}/comments/amount-per-files`
        );
    }
}
