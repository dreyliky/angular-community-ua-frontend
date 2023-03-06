import { Injectable } from '@angular/core';
import { BaseState, NgxState } from 'ngx-base-state';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class FileExplorerDepthState extends BaseState<number> {
    constructor() {
        super(0);
    }
}
