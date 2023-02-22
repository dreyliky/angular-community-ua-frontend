import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/code-review/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequestApiService {
    constructor(private readonly http: HttpClient) {}

    public validateLink(link: string): Observable<boolean> {
        return this.http.get<boolean>(
            `${environment.backendUrl}/source-url/validate?url=${link}`
        );
    }

    public getNormalizedLink(link: string): Observable<string> {
        return this.http.get(
            `${environment.backendUrl}/source-url/stackblitz/normalized?url=${link}`,
            { responseType: 'text' }
        );
    }
}
