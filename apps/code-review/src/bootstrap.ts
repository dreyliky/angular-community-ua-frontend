import { registerBackendUrls } from '@acua/shared';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

registerBackendUrls([environment.backendUrl, environment.mainBackendUrl]);

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
