import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestApiService } from '../api';

@Injectable({ providedIn: 'root' })
export class RequestService {
    constructor(private requestApiService: RequestApiService) {}

    public validateLink(link: string): Observable<boolean> {
        return this.requestApiService.validateLink(link);
    }

    public getNormalizedLink(link: string): Observable<string> {
        return this.requestApiService.getNormalizedLink(link);
    }
}
