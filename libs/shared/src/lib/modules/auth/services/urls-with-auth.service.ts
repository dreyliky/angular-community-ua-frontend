import { Injectable } from '@angular/core';
import { UrlsWithAuthState } from '../states';

// FIXME: Think about better approach for sharing with "ALLOWED" URLS with Interceptor
@Injectable()
export class UrlsWithAuthService {
    constructor(private readonly urlsWithAuthState: UrlsWithAuthState) {}

    public register(urls: string[]): void {
        this.urlsWithAuthState.register(urls);
    }
}
