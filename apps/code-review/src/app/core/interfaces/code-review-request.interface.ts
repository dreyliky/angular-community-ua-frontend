import { CodeReviewStatusEnum } from '@code-review/core';

export interface CodeReviewRequest {
  id: string;
  user: any;
  status: CodeReviewStatusEnum;
  stackblitzUrl: string;
  date: string;
}
