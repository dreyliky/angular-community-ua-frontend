import { AuthService, User, UserService } from '@acua/shared';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppConfig {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    public load(): Observable<unknown> {
        return this.loadUserData();
    }

    private loadUserData(): Observable<User | null> {
        if (this.authService.isAccessTokenExist()) {
            return this.userService.update().pipe(catchError(() => of(null)));
        }

        return of(null);
    }
}
