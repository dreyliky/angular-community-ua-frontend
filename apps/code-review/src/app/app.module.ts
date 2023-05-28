import {
    AppConfigModule,
    AuthModule,
    MATERIAL_ICON_DEFAULT_OPTIONS_PROVIDER
} from '@acua/shared';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgxBaseStateDevtoolsModule } from 'ngx-base-state';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { MAIN_BACKEND_URL_PROVIDER } from './core';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(APP_ROUTES, {
            preloadingStrategy: PreloadAllModules,
            initialNavigation: 'enabledBlocking'
        }),
        AppConfigModule,
        AuthModule,
        NgxBaseStateDevtoolsModule.forRoot({
            isEnabled: !environment.prod
        })
    ],
    providers: [
        MAIN_BACKEND_URL_PROVIDER,
        MATERIAL_ICON_DEFAULT_OPTIONS_PROVIDER
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
