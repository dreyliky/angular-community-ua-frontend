import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '@code-review/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProjectSourceUrlApiService {
    private readonly apiUrl = inject(ENVIRONMENT).backendUrl;

    constructor(private readonly http: HttpClient) {}

    public validate(link: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/source-url/validate?url=${link}`);
    }

    public getNormalized(link: string): Observable<string> {
        return this.http.get(`${this.apiUrl}/source-url/stackblitz/normalized?url=${link}`, {
            responseType: 'text'
        });
    }
}
