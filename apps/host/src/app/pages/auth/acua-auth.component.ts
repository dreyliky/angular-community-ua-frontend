import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'acua-auth',
    templateUrl: './acua-auth.component.html',
    styleUrls: ['./acua-auth.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {}
