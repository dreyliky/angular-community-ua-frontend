import { Injectable } from '@angular/core';
import type { editor } from 'monaco-editor';
import { NgxState, ObjectState } from 'ngx-base-state';

/** ProvidedIn:Root for caching */
@NgxState()
@Injectable({
    providedIn: 'root'
})
export class MonacoThemeDataState extends ObjectState<editor.IStandaloneThemeData> {}
