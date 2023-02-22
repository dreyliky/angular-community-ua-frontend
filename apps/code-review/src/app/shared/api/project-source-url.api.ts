import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/code-review/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProjectSourceUrlService {
    constructor(private readonly http: HttpClient) {}

    public validate(link: string): Observable<boolean> {
        return this.http.get<boolean>(
            `${environment.backendUrl}/source-url/validate?url=${link}`
        );
    }

    public getNormalized(link: string): Observable<string> {
        return this.http.get(
            `${environment.backendUrl}/source-url/stackblitz/normalized?url=${link}`,
            { responseType: 'text' }
        );
    }
}
