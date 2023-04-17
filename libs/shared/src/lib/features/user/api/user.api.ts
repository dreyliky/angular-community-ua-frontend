import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MAIN_BACKEND_URL } from '../../../tokens';
import { User } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class UserApi {
    constructor(
        @Inject(MAIN_BACKEND_URL)
        private readonly backendUrl: string,
        private readonly http: HttpClient
    ) {}

    public get(): Observable<User> {
        return this.http.get<User>(`${this.backendUrl}/users/me`);
    }
}
