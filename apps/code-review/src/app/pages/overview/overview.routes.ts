import { Route } from '@angular/router';

import { OverviewComponent } from './overview.component';
import { OverviewParamEnum } from '@code-review/pages/overview/enums';
import { CodeEditorComponent } from '@code-review/pages/overview/components';

export const OVERVIEW_ROUTES: Route[] = [
    { path: '', component: OverviewComponent },
    { path: OverviewParamEnum.id, component: CodeEditorComponent }
];
