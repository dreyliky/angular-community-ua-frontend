import { Injectable } from '@angular/core';
import type { editor } from 'monaco-editor';
import { ObjectState } from 'ngx-base-state';

@Injectable({
    providedIn: 'root'
})
export class MonacoThemeDataState extends ObjectState<editor.IStandaloneThemeData> {}
