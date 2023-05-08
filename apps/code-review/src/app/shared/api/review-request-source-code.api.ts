import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT } from '@code-review/core';
import { Observable } from 'rxjs';
import { ProjectEntity } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ReviewRequestSourceCodeApi {
    private readonly apiUrl = inject(ENVIRONMENT).backendUrl;
    private readonly http = inject(HttpClient);

    public get(id: string): Observable<ProjectEntity[]> {
        return this.http.get<ProjectEntity[]>(
            `${this.apiUrl}/review-requests/${id}/source-code`
        );
    }
}
