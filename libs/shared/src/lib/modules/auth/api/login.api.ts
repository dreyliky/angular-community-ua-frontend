import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MAIN_BACKEND_URL } from '../../../tokens';
import { LoginResponseDto, TelegramLoginDto } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class LoginApi {
    constructor(
        @Inject(MAIN_BACKEND_URL)
        private readonly backendUrl: string,
        private readonly http: HttpClient
    ) {}

    public loginByTelegram(
        data: TelegramLoginDto
    ): Observable<LoginResponseDto> {
        return this.http.post<LoginResponseDto>(
            `${this.backendUrl}/login`,
            data
        );
    }
}
