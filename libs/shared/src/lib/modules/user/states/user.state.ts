import { Injectable } from '@angular/core';
import { NgxState, ObjectState } from 'ngx-base-state';
import { User } from '../interfaces';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class UserState extends ObjectState<User> {}
