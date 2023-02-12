import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'acua-my-requests',
    templateUrl: './my-requests.component.html',
    styleUrls: ['./my-requests.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyRequestsComponent {}
