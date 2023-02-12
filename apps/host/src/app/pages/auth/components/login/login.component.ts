import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ENVIRONMENT } from '@host/core/tokens';
import { LoginWidgetConfig, TelegramLoginResponse } from '@host/interfaces';
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
        'data-telegram-login': this.env['BotLoginName'],
        'data-size': 'large',
        'data-request-access': 'write',
        'data-onauth': 'onTelegramLogin(user)'
    };

    constructor(
        @Inject(ENVIRONMENT)
        private readonly env: typeof environment
    ) {
    }

    public onTelegramLogin(user: TelegramLoginResponse): void {
        console.log(user);
    }
}
