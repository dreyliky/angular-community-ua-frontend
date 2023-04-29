import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { LoginApi } from '../api';
import { TelegramLoginDto } from '../interfaces';
import { BearerTokenService } from './bearer-token.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(
        private readonly loginApi: LoginApi,
        private readonly bearerTokenService: BearerTokenService
    ) {}

    public loginByTelegram(data: TelegramLoginDto): Observable<string> {
        return this.loginApi.loginByTelegram(data).pipe(
            map(({ accessToken }) => accessToken),
            tap((bearerToken) => this.bearerTokenService.set(bearerToken))
        );
    }
}
