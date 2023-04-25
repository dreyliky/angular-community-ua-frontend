import { User } from '@acua/shared';
import { CodeReviewRequestStatusEnum } from '../enums';

export interface ReviewRequestDto {
    readonly id: string;
    readonly user: User;
    readonly title: string;
    readonly description: string;
    readonly status: CodeReviewRequestStatusEnum;
    readonly sourceUrl: string;
    readonly date: string;
}

export interface ReviewRequestCreationDto {
    readonly description: string;
    readonly sourceUrl: string;
}
