import { Route } from '@angular/router';
import { OverviewDataParam, OverviewParamEnum } from './enums';
import { OverviewComponent } from './overview.component';
import { MonacoApiResolver } from './resolvers';

export const OVERVIEW_ROUTES: Route[] = [
    {
        path: `:${OverviewParamEnum.id}`,
        component: OverviewComponent,
        resolve: { [OverviewDataParam.MonacoApi]: MonacoApiResolver }
    }
];
