import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OverviewComponent } from './overview.component';
import { OVERVIEW_ROUTES } from './overview.routing';

@NgModule({
    declarations: [OverviewComponent],
    imports: [CommonModule, RouterModule.forChild(OVERVIEW_ROUTES)]
})
export class OverviewModule { }
