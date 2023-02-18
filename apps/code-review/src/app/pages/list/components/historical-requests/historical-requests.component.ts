import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'acua-historical-requests',
    templateUrl: './historical-requests.component.html',
    styleUrls: [
        './historical-requests.component.scss',
        '../../styles/request-styles.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoricalRequestsComponent {}
