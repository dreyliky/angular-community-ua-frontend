import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvailableForScreenDirective } from './directives';

@NgModule({
    declarations: [AvailableForScreenDirective],
    imports: [CommonModule, LayoutModule],
    exports: [AvailableForScreenDirective]
})
export class ScreenModule {}
