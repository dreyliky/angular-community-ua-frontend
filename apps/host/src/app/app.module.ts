import { AuthModule, UrlsWithAuthService } from '@acua/shared';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { APP_CONFIG_PROVIDER } from './config';
import { MAIN_BACKEND_URL_PROVIDER } from './core';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(APP_ROUTES, {
            preloadingStrategy: PreloadAllModules,
            initialNavigation: 'enabledBlocking'
        }),
        AuthModule,
        HttpClientModule
    ],
    providers: [APP_CONFIG_PROVIDER, MAIN_BACKEND_URL_PROVIDER],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private readonly urlsWithAuthService: UrlsWithAuthService) {
        this.urlsWithAuthService.register([environment.backendUrl]);
    }
}
