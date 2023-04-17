import { InjectionToken } from '@angular/core';
import type { editor } from 'monaco-editor';

export const MONACO_EDITOR = new InjectionToken<editor.IStandaloneCodeEditor>('MONACO_EDITOR');
