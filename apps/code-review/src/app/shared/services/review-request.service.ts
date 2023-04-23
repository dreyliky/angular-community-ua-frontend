import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewRequestApi } from '../api';
import { ResponseWithId, ReviewRequestCreationDto, ReviewRequestDto } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ReviewRequestService {
    constructor(private readonly reviewRequestsApi: ReviewRequestApi) {}

    public getAll(): Observable<ReviewRequestDto[]> {
        return this.reviewRequestsApi.getAll();
    }

    public create(data: ReviewRequestCreationDto): Observable<ResponseWithId> {
        return this.reviewRequestsApi.create(data);
    }
}
