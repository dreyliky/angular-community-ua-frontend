import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoginApi } from './api';
import {
    AvailableForAuthorizedOnlyDirective,
    AvailableForUnauthorizedOnlyDirective
} from './directives';
import { BearerTokenInterceptor } from './interceptors';
import { AuthService, BearerTokenService, LoginService, UrlsWithAuthService } from './services';
import { UrlsWithAuthState } from './states';

@NgModule({
    declarations: [AvailableForAuthorizedOnlyDirective, AvailableForUnauthorizedOnlyDirective],
    providers: [
        LoginApi,
        AuthService,
        BearerTokenService,
        LoginService,
        UrlsWithAuthService,
        UrlsWithAuthState,
        { provide: HTTP_INTERCEPTORS, useClass: BearerTokenInterceptor, multi: true }
    ],
    exports: [AvailableForAuthorizedOnlyDirective, AvailableForUnauthorizedOnlyDirective]
})
export class AuthModule {}
