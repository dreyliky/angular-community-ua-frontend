import { Route } from '@angular/router';
import { OverviewDataParam, OverviewParamEnum } from './enums';
import { OverviewComponent } from './overview.component';
import { MonacoApiResolver, ReviewRequestCommentsResolver } from './resolvers';

export const OVERVIEW_ROUTES: Route[] = [
    {
        path: `:${OverviewParamEnum.Id}`,
        component: OverviewComponent,
        resolve: {
            [OverviewDataParam.MonacoApi]: MonacoApiResolver,
            [OverviewDataParam.Comments]: ReviewRequestCommentsResolver
        }
    }
];
