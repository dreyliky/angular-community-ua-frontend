import { Route } from '@angular/router';
import { OverviewParamEnum } from './enums';
import { OverviewComponent } from './overview.component';
export const OVERVIEW_ROUTES: Route[] = [
    {
        path: `:${OverviewParamEnum.Id}`,
        component: OverviewComponent
    }
];
