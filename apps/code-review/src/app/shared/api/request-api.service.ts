import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequestApiService {
    private apiUrl = 'http://161.35.70.152:3001';

    constructor(private http: HttpClient) {}

    public validateLink(link: string): Observable<boolean> {
        return this.http.get<boolean>(
            `${this.apiUrl}/source-url/validate?url=${link}`
        );
    }

    public getNormalizedLink(link: string): Observable<string> {
        return this.http.get(
            `${this.apiUrl}/source-url/stackblitz/normalized?url=${link}`,
            { responseType: 'text' }
        );
    }
}
