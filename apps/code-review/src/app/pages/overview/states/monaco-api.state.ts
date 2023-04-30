import { Injectable } from '@angular/core';
import { NgxState, ObjectState } from 'ngx-base-state';
import { MonacoApi } from '../types';

@NgxState()
@Injectable()
export class MonacoApiState extends ObjectState<MonacoApi> {}
