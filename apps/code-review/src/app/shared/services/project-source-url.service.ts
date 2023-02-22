import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectSourceUrlService as ProjectSourceUrlApiService } from '../api';

@Injectable({ providedIn: 'root' })
export class ProjectSourceUrlService {
    constructor(
        private readonly projectSourceUrlApi: ProjectSourceUrlApiService
    ) {}

    public validate(link: string): Observable<boolean> {
        return this.projectSourceUrlApi.validate(link);
    }

    public getNormalized(link: string): Observable<string> {
        return this.projectSourceUrlApi.getNormalized(link);
    }
}
