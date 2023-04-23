import { PipesModule } from '@acua/shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgxAsyncModule } from 'ngx-async-directive';
import { CreationButtonComponent, RequestFormComponent } from './components';
import { RequestComponent } from './request.component';
import { REQUEST_ROUTES } from './request.routes';

@NgModule({
    declarations: [RequestComponent, RequestFormComponent, CreationButtonComponent],
    imports: [
        CommonModule,
        NgxAsyncModule,
        MatRippleModule,
        MatTooltipModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        RouterModule.forChild(REQUEST_ROUTES),
        ReactiveFormsModule,
        PipesModule
    ]
})
export class RequestModule {}
