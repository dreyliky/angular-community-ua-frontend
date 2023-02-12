import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TelegramLoginResponse } from '@host/interfaces';

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
