import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '@code-review/core';
import { MonacoTreeNode } from '@code-review/pages/overview/components/file-explorer/interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProjectSourceUrlApiService {
    private readonly environment = inject(ENVIRONMENT);

    constructor(private readonly http: HttpClient) {}

    public getSource(link: string): Observable<MonacoTreeNode[]> {
        return this.http.get<MonacoTreeNode[]>(
            `${this.environment.backendUrl}/source-code?url=${link}`
        );
    }

    public validate(link: string): Observable<boolean> {
        return this.http.get<boolean>(
            `${this.environment.backendUrl}/source-url/validate?url=${link}`
        );
    }

    public getNormalized(link: string): Observable<string> {
        return this.http.get(
            `${this.environment.backendUrl}/source-url/stackblitz/normalized?url=${link}`,
            { responseType: 'text' }
        );
    }
}
