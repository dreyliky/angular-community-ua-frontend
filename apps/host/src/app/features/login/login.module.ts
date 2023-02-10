import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginWidgetComponent } from './components/login-widget/login-widget.component';
import { LoginWidgetDirective } from './directives/login-widget.directive';

@NgModule({
    declarations: [
        LoginWidgetComponent,
        LoginWidgetDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [LoginWidgetComponent]
})
export class LoginModule { }
