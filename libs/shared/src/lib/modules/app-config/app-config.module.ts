import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppConfig } from './app.config';

@NgModule({
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: (config: AppConfig) => () => config.load(),
            deps: [AppConfig],
            multi: true
        }
    ]
})
export class AppConfigModule {}
