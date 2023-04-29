import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RequestForm } from './forms';
import { SourceUrlValidator } from './validators';

@Component({
    selector: 'acua-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RequestForm, SourceUrlValidator],
    host: {
        class: 'acua-page'
    }
})
export class RequestComponent {}
