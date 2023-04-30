import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { editor } from 'monaco-editor';
import { Observable, of, tap } from 'rxjs';
import { MonacoApiState, MonacoThemeDataState } from '../states';
import { MonacoApi } from '../types';

@Injectable()
export class MonacoThemeLoaderService {
    private readonly themeName = 'tommorow-night';
    private readonly themeUrl = `/assets/json/monaco-themes/tommorow-night.json`;

    private get monacoApi(): MonacoApi {
        return this.monacoApiState.data!;
    }

    constructor(
        private readonly monacoApiState: MonacoApiState,
        private readonly themeDataState: MonacoThemeDataState,
        private readonly http: HttpClient
    ) {}

    public loadAndDefine(): Observable<editor.IStandaloneThemeData> {
        return this.load().pipe(
            tap((themeData) => this.monacoApi.editor.defineTheme(this.themeName, themeData))
        );
    }

    private load(): Observable<editor.IStandaloneThemeData> {
        if (!this.themeDataState.data) {
            return this.initTheme();
        }

        return of(this.themeDataState.data);
    }

    private initTheme(): Observable<editor.IStandaloneThemeData> {
        return this.http
            .get<editor.IStandaloneThemeData>(this.themeUrl)
            .pipe(tap((themeData) => this.themeDataState.set(themeData)));
    }
}
