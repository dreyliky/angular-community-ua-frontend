import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BearerTokenService } from '../services';
import { UrlsWithAuthState } from '../states';

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {
    constructor(
        private readonly urlsWithAuthState: UrlsWithAuthState,
        private readonly bearerTokenService: BearerTokenService
    ) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.bearerTokenService.get();

        if (!!accessToken && this.isRequestShouldBeWithAuth(request.url)) {
            const requestWithAuth = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
            });

            return next.handle(requestWithAuth);
        }

        return next.handle(request);
    }

    private isRequestShouldBeWithAuth(url: string): boolean {
        return this.urlsWithAuthState.data!.some((allowedUrl) => url.startsWith(allowedUrl));
    }
}
