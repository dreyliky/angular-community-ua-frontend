import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OverviewComponent } from './overview.component';
import { OVERVIEW_ROUTES } from './overview.routes';
import { CodeEditorComponent } from '@code-review/pages/overview/components';

@NgModule({
    declarations: [OverviewComponent, CodeEditorComponent],
    imports: [CommonModule, RouterModule.forChild(OVERVIEW_ROUTES)]
})
export class OverviewModule {}
