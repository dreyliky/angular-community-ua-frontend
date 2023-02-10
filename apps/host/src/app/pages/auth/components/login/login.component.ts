import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginWidgetEnum } from './../../../../features/login/enums/login-widget.enum';
import { LoginWidgetConfig } from './../../../../features/login/interfaces/login-widget.interface';

@Component({
    selector: 'acua-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    public widgetConfig: LoginWidgetConfig = {
        'src': 'https://telegram.org/js/telegram-widget.js?21',
        'data-telegram-login': 'acua_dev_bot',
        'data-size': 'large',
        'data-request-access': 'write',
        'data-onauth': LoginWidgetEnum.BotCallback
    };
}
