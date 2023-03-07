import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import monacoLoader from '@monaco-editor/loader';
import { MonacoApi } from '../types';

@Injectable()
export class MonacoApiResolver implements Resolve<MonacoApi> {
    public resolve(): Promise<MonacoApi> {
        return monacoLoader.init();
    }
}
