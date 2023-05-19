import { Injectable } from '@angular/core';
import { NgxState, PrimitiveState } from 'ngx-base-state';

@NgxState()
@Injectable()
export class MarkdownViewModeState extends PrimitiveState<boolean> {
    constructor() {
        super(true);
    }
}
