import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../core';
import { MonacoTreeNode } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class SourceCodeApi {
    private readonly environment = inject(ENVIRONMENT);

    private get endpoint(): string {
        return `${this.environment.backendUrl}/source-code?url=`;
    }

    constructor(
        private readonly http: HttpClient
    ) {}

    public get(source: string): Observable<MonacoTreeNode[]> {
        return this.http.get<MonacoTreeNode[]>(this.endpoint + source);
    }
}
