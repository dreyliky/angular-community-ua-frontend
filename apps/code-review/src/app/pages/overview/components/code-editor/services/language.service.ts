import { Inject, Injectable } from '@angular/core';
import { MONACO_API } from '../../../tokens';
import { MonacoApi } from '../../../types';

@Injectable()
export class LanguageService {
    /** Key - file extension; Value - language id */
    private readonly fileExtensionMap = new Map<string, string>();

    constructor(
        @Inject(MONACO_API)
        private readonly monacoApi: MonacoApi
    ) {
        this.initFileExtensionMap();
    }

    public getLanguageIdByFileFullPath(fileFullPath: string): string {
        const fileExtension = this.getFileExtension(fileFullPath);

        return this.fileExtensionMap.get(fileExtension) ?? 'plaintext';
    }

    private getFileExtension(fileFullPath: string): string {
        const fileExtension = fileFullPath.split('.').pop()?.toLowerCase();

        return `.${fileExtension}` ?? '';
    }

    private initFileExtensionMap(): void {
        const languages = this.monacoApi.languages.getLanguages();

        languages.forEach((language) => {
            language.extensions?.forEach((extension) => {
                this.fileExtensionMap.set(extension, language.id);
            });
        });
    }
}
