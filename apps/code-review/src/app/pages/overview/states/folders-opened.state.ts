import { Injectable } from '@angular/core';
import { NgxState, RecordState } from 'ngx-base-state';

/** Key - fullPath; Value - isOpened */
@NgxState()
@Injectable()
export class FoldersOpenedState extends RecordState<string, boolean> {
    constructor() {
        super({});
    }
}
