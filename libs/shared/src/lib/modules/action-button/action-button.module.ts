import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScreenModule } from '../screen';
import { ActionButtonComponent } from './action-button.component';

@NgModule({
    declarations: [ActionButtonComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, ScreenModule],
    exports: [ActionButtonComponent]
})
export class ActionButtonModule {}
