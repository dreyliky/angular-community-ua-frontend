import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppRouteEnum } from '@host/core';

@Component({
    selector: 'acua-login-button',
    templateUrl: './login-button.component.html',
    styleUrls: ['./login-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginButtonComponent {
    public readonly authPageLink = `/${AppRouteEnum.Auth}`;
}
