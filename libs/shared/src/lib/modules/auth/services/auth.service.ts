import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { User, UserService } from '../../user';
import { TelegramLoginDto } from '../interfaces';
import { BearerTokenService } from './bearer-token.service';
import { LoginService } from './login.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly loginService: LoginService,
        private readonly userService: UserService,
        private readonly bearerTokenService: BearerTokenService
    ) {}

    public authByTelegram(data: TelegramLoginDto): Observable<User> {
        return this.loginService
            .loginByTelegram(data)
            .pipe(switchMap(() => this.userService.update()));
    }

    public logout(): void {
        this.bearerTokenService.clear();
        this.userService.clear();
    }

    public isAccessTokenExist(): boolean {
        return !!this.bearerTokenService.get();
    }
}
