import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        LoginModule
    ],
    exports: [LoginModule]
})
export class FeaturesModule { }
