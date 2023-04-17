import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BearerTokenService } from '../services';
import { URLS_WITH_AUTH } from '../tokens';

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {
    constructor(
        @Inject(URLS_WITH_AUTH)
        private readonly urlsWithAuth: string[],
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
        return this.urlsWithAuth.some((allowedUrl) => url.startsWith(allowedUrl));
    }
}
