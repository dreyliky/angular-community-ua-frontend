import { AuthService, UrlsWithAuthService, User, UserService } from '@acua/shared';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppConfig {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly urlsWithAuthService: UrlsWithAuthService
    ) {}

    public load(): Observable<unknown> {
        this.urlsWithAuthService.register([environment.backendUrl, environment.mainBackendUrl]);

        return this.loadUserData();
    }

    private loadUserData(): Observable<User | null> {
        if (this.authService.isAccessTokenExist()) {
            return this.userService.update().pipe(catchError(() => of(null)));
        }

        return of(null);
    }
}
