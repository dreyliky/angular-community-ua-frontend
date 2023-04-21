import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewRequestsApi } from '../api';
import { CodeReviewRequest } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ReviewRequestsService {
    constructor(private readonly reviewRequestsApi: ReviewRequestsApi) {}

    public getAll(): Observable<CodeReviewRequest[]> {
        return this.reviewRequestsApi.getAll();
    }
}
