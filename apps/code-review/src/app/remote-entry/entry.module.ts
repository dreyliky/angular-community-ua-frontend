import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { REMOTE_ROUTES } from './entry.routes';

@NgModule({
    declarations: [RemoteEntryComponent],
    imports: [CommonModule, RouterModule.forChild(REMOTE_ROUTES)]
})
export class RemoteEntryModule {}
