import { Injectable } from '@angular/core';
import { ReviewRequestDto } from '@code-review/shared';
import { NgxState, ObjectState } from 'ngx-base-state';

@NgxState()
@Injectable()
export class OpenedReviewRequestState extends ObjectState<ReviewRequestDto> {}
