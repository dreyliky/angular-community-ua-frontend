import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReviewRequestCommentAmountDictionary as CommentAmountDictionary } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ReviewRequestCommentsApi {
    public getAmountDictionary(
        reviewRequestId: string
    ): Observable<CommentAmountDictionary> {
        return of({
            'src/app/app.component.ts': {
                '1': 3,
                '3': 99
            }
        });
    }
}
