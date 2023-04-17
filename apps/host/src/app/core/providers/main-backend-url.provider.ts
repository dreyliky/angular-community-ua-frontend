import { MAIN_BACKEND_URL } from '@acua/shared';
import { Provider, inject } from '@angular/core';
import { ENVIRONMENT } from '../tokens';

export const MAIN_BACKEND_URL_PROVIDER: Provider = {
    provide: MAIN_BACKEND_URL,
    useFactory: () => inject(ENVIRONMENT).backendUrl
};
