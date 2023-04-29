import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT } from '@code-review/core';
import { Observable } from 'rxjs';
import { ResponseWithId, ReviewRequestCreationDto, ReviewRequestDto } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ReviewRequestApi {
    private readonly apiUrl = inject(ENVIRONMENT).backendUrl;

    constructor(private readonly http: HttpClient) {}

    public getAll(): Observable<ReviewRequestDto[]> {
        return this.http.get<ReviewRequestDto[]>(`${this.apiUrl}/review-requests`);
    }

    public get(id: string): Observable<ReviewRequestDto> {
        return this.http.get<ReviewRequestDto>(`${this.apiUrl}/review-requests/${id}`);
    }

    public create(data: ReviewRequestCreationDto): Observable<ResponseWithId> {
        return this.http.post<ResponseWithId>(`${this.apiUrl}/review-requests`, data);
    }
}
