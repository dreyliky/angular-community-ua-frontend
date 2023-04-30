import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewRequestApi } from '../api';
import { CodeReviewRequestStatusEnum } from '../enums';
import { ResponseWithId, ReviewRequestCreationDto, ReviewRequestDto } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ReviewRequestService {
    constructor(private readonly reviewRequestsApi: ReviewRequestApi) {}

    public getAllWithStatus(status: CodeReviewRequestStatusEnum): Observable<ReviewRequestDto[]> {
        return this.reviewRequestsApi.getAllWithStatus(status);
    }

    public getAllMy(): Observable<ReviewRequestDto[]> {
        return this.reviewRequestsApi.getAllMy();
    }

    public get(id: string): Observable<ReviewRequestDto> {
        return this.reviewRequestsApi.get(id);
    }

    public create(data: ReviewRequestCreationDto): Observable<ResponseWithId> {
        return this.reviewRequestsApi.create(data);
    }
}
