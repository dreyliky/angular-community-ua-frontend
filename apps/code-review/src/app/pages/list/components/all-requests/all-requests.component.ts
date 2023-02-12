import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'acua-all-requests',
    templateUrl: './all-requests.component.html',
    styleUrls: ['./all-requests.component.scss', '../../styles/request-styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllRequestsComponent {}
