import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonacoTreeNode } from '../../pages/overview/components/file-explorer/interfaces';
import { ProjectSourceUrlApiService } from '../api';

@Injectable({ providedIn: 'root' })
export class ProjectSourceUrlService {
    constructor(
        private readonly projectSourceUrlApi: ProjectSourceUrlApiService
    ) {}

    public getSource(link: string): Observable<MonacoTreeNode[]> {
        return this.projectSourceUrlApi.getSource(link);
    }

    public validate(link: string): Observable<boolean> {
        return this.projectSourceUrlApi.validate(link);
    }

    public getNormalized(link: string): Observable<string> {
        return this.projectSourceUrlApi.getNormalized(link);
    }
}
