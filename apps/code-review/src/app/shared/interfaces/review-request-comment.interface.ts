import { User } from '@acua/shared';

export interface ReviewRequestComment {
    readonly id: string;
    readonly message: string;
    readonly date: string;
    readonly reviewer: User;
}
