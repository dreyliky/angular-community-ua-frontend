import { Injectable } from '@angular/core';
import { OpenDirectory } from '@code-review/shared';
import { NgxState, ObjectState } from 'ngx-base-state';

@NgxState()
@Injectable()
export class OpenDirectoryState extends ObjectState<OpenDirectory> {}
