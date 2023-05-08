import { Injectable } from '@angular/core';
import {
    FileCommentAmountDictionary,
    ReviewRequestCommentAmountDictionary
} from '@code-review/shared';
import { NgxState, ObjectState } from 'ngx-base-state';
import { Observable, filter, map } from 'rxjs';

@NgxState()
@Injectable()
export class ReviewRequestCommentsState extends ObjectState<ReviewRequestCommentAmountDictionary> {
    public getFileCommentsAmount(
        fileFullPath: string
    ): FileCommentAmountDictionary {
        return this.data![fileFullPath];
    }

    public getFileTotalCommentsAmount(
        fileFullPath: string
    ): Observable<number> {
        return this.data$.pipe(
            filter(Boolean),
            map((dictionary) => dictionary[fileFullPath]),
            filter(Boolean),
            map((data) => this.mapFileCommentAmountToTotalAmount(data))
        );
    }

    private mapFileCommentAmountToTotalAmount(
        data: FileCommentAmountDictionary
    ): number {
        const commentAmountPerLines = Object.values(data);

        return commentAmountPerLines.reduce((accumulator, amount) => {
            return accumulator + amount;
        }, 0);
    }
}
