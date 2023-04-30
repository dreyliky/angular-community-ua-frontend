import { registerBackendUrls } from '@acua/shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { RemoteEntryComponent } from './entry.component';
import { REMOTE_ROUTES } from './entry.routes';

registerBackendUrls([environment.backendUrl, environment.mainBackendUrl]);

@NgModule({
    declarations: [RemoteEntryComponent],
    imports: [CommonModule, RouterModule.forChild(REMOTE_ROUTES)]
})
export class RemoteEntryModule {}
