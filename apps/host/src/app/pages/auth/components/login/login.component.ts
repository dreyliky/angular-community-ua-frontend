import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TelegramLoginResponse } from '@host/shared';

@Component({
    selector: 'acua-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    public onTelegramLogin(user: TelegramLoginResponse): void {
        console.log(user);
    }
}
