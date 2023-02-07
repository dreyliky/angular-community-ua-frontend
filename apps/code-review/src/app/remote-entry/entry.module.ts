import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routing';

@NgModule({
    declarations: [RemoteEntryComponent],
    imports: [CommonModule, RouterModule.forChild(remoteRoutes)]
})
export class RemoteEntryModule {}
