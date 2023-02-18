import { Route } from '@angular/router';

import { OverviewComponent } from './overview.component';
import { OverviewParamEnum } from '@code-review/pages/overview/enums';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';

export const OVERVIEW_ROUTES: Route[] = [
    { path: '', component: OverviewComponent },
    { path: `:${OverviewParamEnum.id}`, component: FileExplorerComponent }
];
