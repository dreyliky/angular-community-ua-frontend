import { User } from '@acua/shared';
import { CodeReviewRequestStatusEnum } from '../enums';

export interface CodeReviewRequest {
    readonly id: string;
    readonly user: User;
    readonly title: string;
    readonly description: string;
    readonly status: CodeReviewRequestStatusEnum;
    readonly sourceUrl: string;
    readonly date: string;
}
