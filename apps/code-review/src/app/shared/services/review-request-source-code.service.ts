import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewRequestSourceCodeApi } from '../api';
import { ProjectEntity } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ReviewRequestSourceCodeService {
    constructor(private readonly sourceCodeApi: ReviewRequestSourceCodeApi) {}

    public get(id: string): Observable<ProjectEntity[]> {
        return this.sourceCodeApi.get(id);
    }
}
