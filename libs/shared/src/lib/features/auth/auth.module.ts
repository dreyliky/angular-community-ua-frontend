import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoginApi } from './api';
import { BearerTokenInterceptor } from './interceptors';
import { AuthModuleOptions } from './interfaces';
import { AuthService, BearerTokenService, LoginService } from './services';
import { URLS_WITH_AUTH } from './tokens';

@NgModule({})
export class AuthModule {
    public static init(options: AuthModuleOptions): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                LoginApi,
                AuthService,
                BearerTokenService,
                LoginService,
                { provide: URLS_WITH_AUTH, useValue: options.urlsWithAuth },
                { provide: HTTP_INTERCEPTORS, useClass: BearerTokenInterceptor, multi: true }
            ]
        };
    }
}
