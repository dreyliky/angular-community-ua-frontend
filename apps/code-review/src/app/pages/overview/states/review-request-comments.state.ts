import { Injectable } from '@angular/core';
import {
    FileCommentAmountDictionary,
    ReviewRequestCommentAmountDictionary
} from '@code-review/shared';
import { NgxState, ObjectState } from 'ngx-base-state';

@NgxState()
@Injectable()
export class ReviewRequestCommentsState extends ObjectState<ReviewRequestCommentAmountDictionary> {
    public getFileCommentsAmount(fileFullPath: string): FileCommentAmountDictionary {
        return this.data![fileFullPath];
    }
}
