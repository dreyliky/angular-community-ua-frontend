import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'acua-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestComponent {}
