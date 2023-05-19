import { Injectable } from '@angular/core';
import { NgxState, RecordState } from 'ngx-base-state';

@NgxState()
@Injectable()
export class InitialFoldersOpenedState extends RecordState<string, boolean> {
    constructor() {
        super({});
    }
}
