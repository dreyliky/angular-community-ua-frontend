import { Injectable } from '@angular/core';
import { BaseState, NgxState } from 'ngx-base-state';

@NgxState()
@Injectable()
export class MarkdownInputState extends BaseState<string> {
    constructor() {
        super('');
    }
}
