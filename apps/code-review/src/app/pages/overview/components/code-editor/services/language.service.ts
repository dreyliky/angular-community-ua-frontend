import { Inject, Injectable } from '@angular/core';
import { MONACO_API } from '../../../tokens';
import { MonacoApi } from '../../../types';

@Injectable()
export class LanguageService {
    /** Key - file extension; Value - languageId */
    private readonly fileExtensionMap = new Map<string, string>();

    private readonly defaultLanguageId = 'plaintext';

    constructor(
        @Inject(MONACO_API)
        private readonly monacoApi: MonacoApi
    ) {
        this.initFileExtensionMap();
    }

    public getLanguageIdByFileFullPath(fileFullPath: string): string {
        const fileExtension = this.getFileExtension(fileFullPath);

        return this.fileExtensionMap.get(fileExtension) ?? this.defaultLanguageId;
    }

    private getFileExtension(fileFullPath: string): string {
        const lastDotIndex = fileFullPath.lastIndexOf('.');
        const fileExtension = fileFullPath.slice(lastDotIndex).toLowerCase();

        return fileExtension;
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
