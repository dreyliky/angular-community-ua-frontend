import { CodeReviewRequestStatusEnum } from '../enums';

export interface CodeReviewRequest {
    readonly id: string;
    readonly user: any;
    readonly status: CodeReviewRequestStatusEnum;
    readonly stackblitzUrl: string;
    readonly date: string;
}
