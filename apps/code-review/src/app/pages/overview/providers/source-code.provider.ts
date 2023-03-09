import { inject, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SOURCE_CODE } from '../tokens';
import { OverviewDataParam } from './../enums';

export const SOURCE_CODE_PROVIDER: Provider = {
    provide: SOURCE_CODE,
    useFactory: () => {
        const route = inject(ActivatedRoute);
        const sourceData = route.snapshot.data[OverviewDataParam.SourceCode];

        return sourceData;
    }
};
