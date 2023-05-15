import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserApi } from '../api';
import { User } from '../interfaces';
import { UserState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public readonly data$ = this.userState.data$;

    public get data(): User | null {
        return this.userState.data;
    }

    constructor(
        private readonly userApi: UserApi,
        private readonly userState: UserState
    ) {}

    public update(): Observable<User> {
        return this.userApi.get().pipe(tap((user) => this.userState.set(user)));
    }

    public clear(): void {
        this.userState.clear();
    }
}
