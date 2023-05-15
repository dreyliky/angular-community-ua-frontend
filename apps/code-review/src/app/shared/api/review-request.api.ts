import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT } from '@code-review/core';
import { Observable } from 'rxjs';
import { CodeReviewRequestStatusEnum } from '../enums';
import {
    ResponseWithId,
    ReviewRequestCreationDto,
    ReviewRequestDto
} from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ReviewRequestApi {
    private readonly apiUrl = inject(ENVIRONMENT).backendUrl;
    private readonly http = inject(HttpClient);

    public getAllWithStatus(
        status: CodeReviewRequestStatusEnum
    ): Observable<ReviewRequestDto[]> {
        return this.http.get<ReviewRequestDto[]>(
            `${this.apiUrl}/review-requests/status/${status}`
        );
    }

    public getAllMy(): Observable<ReviewRequestDto[]> {
        return this.http.get<ReviewRequestDto[]>(
            `${this.apiUrl}/review-requests/my`
        );
    }

    public get(id: string): Observable<ReviewRequestDto> {
        return this.http.get<ReviewRequestDto>(
            `${this.apiUrl}/review-requests/${id}`
        );
    }

    public create(data: ReviewRequestCreationDto): Observable<ResponseWithId> {
        return this.http.post<ResponseWithId>(
            `${this.apiUrl}/review-requests`,
            data
        );
    }
}
