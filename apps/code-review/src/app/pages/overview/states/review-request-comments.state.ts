import { Injectable } from '@angular/core';
import { ReviewRequestCommentAmountDictionary as CommentAmount } from '@code-review/shared';
import { NgxState, ObjectState } from 'ngx-base-state';

@NgxState()
@Injectable()
export class ReviewRequestCommentAmountState extends ObjectState<CommentAmount> {}
