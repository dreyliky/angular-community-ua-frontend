import { ElementRef, inject, Provider } from '@angular/core';
import { MonacoApiState } from '../../../states';
import { MonacoApi } from '../../../types';
import { MONACO_OPTIONS } from '../constants';
import { MONACO_EDITOR } from '../tokens';

export const MONACO_EDITOR_PROVIDER: Provider = {
    provide: MONACO_EDITOR,
    useFactory: () => {
        const monacoApiState = inject(MonacoApiState);
        const hostRef = inject(ElementRef);
        const monacoApi: MonacoApi = monacoApiState.data!;

        return monacoApi.editor.create(hostRef.nativeElement, MONACO_OPTIONS);
    }
};
