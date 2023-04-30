import { inject, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverviewDataParam as DataParam } from '../enums';
import { MONACO_API } from '../tokens';
import { MonacoApi } from '../types';

export const MONACO_API_PROVIDER: Provider = {
    provide: MONACO_API,
    useFactory: () => {
        const activatedRoute = inject(ActivatedRoute);
        const routeData = activatedRoute.snapshot.data;
        const monacoApi: MonacoApi = routeData[DataParam.MonacoApi];

        return monacoApi;
    }
};
