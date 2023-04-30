import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import type { editor } from 'monaco-editor';
import { Observable, of, tap } from 'rxjs';
import { MonacoThemeDataState } from '../states';
import { MONACO_API } from '../tokens';
import { MonacoApi } from '../types';

@Injectable()
export class MonacoThemeLoaderService {
    private readonly themeName = 'tommorow-night';
    private readonly themeUrl = `/assets/json/monaco-themes/tommorow-night.json`;

    constructor(
        @Inject(MONACO_API) private readonly monacoApi: MonacoApi,
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
