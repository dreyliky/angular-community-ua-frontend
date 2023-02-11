import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'acua-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class OverviewComponent {}
