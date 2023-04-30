import { inject, Provider } from '@angular/core';
import { MonacoApiState } from '../../../states';
import { MONACO_API } from '../tokens';

export const MONACO_API_PROVIDER: Provider = {
    provide: MONACO_API,
    useFactory: () => {
        const monacoApiState = inject(MonacoApiState);

        return monacoApiState.data!;
    }
};
