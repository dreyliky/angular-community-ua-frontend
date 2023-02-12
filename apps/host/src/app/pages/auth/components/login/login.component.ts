import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TelegramLoginResponse } from '@host/interfaces';
import { LoginWidgetConfig } from '@host/interfaces/login-widget.interface';
import { environment } from 'apps/host/src/environments/environment';

@Component({
    selector: 'acua-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    public readonly widgetConfig: LoginWidgetConfig = {
        'src': 'https://telegram.org/js/telegram-widget.js?21',
        'data-telegram-login': environment['BotLoginName'],
        'data-size': 'large',
        'data-request-access': 'write',
        'data-onauth': 'onTelegramLogin(user)'
    };

    public onTelegramLogin(user: TelegramLoginResponse): void {
        console.log(user);
    }
}
