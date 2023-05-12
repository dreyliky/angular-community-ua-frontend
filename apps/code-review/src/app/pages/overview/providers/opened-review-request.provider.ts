import { Provider, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverviewParamEnum } from '../enums';
import { OPENED_REVIEW_REQUEST_ID } from '../tokens';

export const OPENED_REVIEW_REQUEST_ID_PROVIDER: Provider = {
    provide: OPENED_REVIEW_REQUEST_ID,
    useFactory: () => {
        const activatedRoute = inject(ActivatedRoute);

        return activatedRoute.snapshot.params[OverviewParamEnum.Id];
    }
};
