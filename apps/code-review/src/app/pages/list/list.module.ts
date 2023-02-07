import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ListComponent } from './list.component';
import { LIST_ROUTES } from './list.routing';

@NgModule({
    declarations: [ListComponent],
    imports: [CommonModule, RouterModule.forChild(LIST_ROUTES)]
})
export class ListModule { }
