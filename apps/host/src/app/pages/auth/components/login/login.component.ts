import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginWidgetEnum } from '@host/features/login/enums/login-widget.enum';
import { LoginWidgetConfig } from '@host/features/login/interfaces/login-widget.interface';
import { environment } from 'apps/host/src/environments/environment';

@Component({
    selector: 'acua-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    public widgetConfig: LoginWidgetConfig = {
        'src': 'https://telegram.org/js/telegram-widget.js?21',
        'data-telegram-login': environment['BotLoginName'],
        'data-size': 'large',
        'data-request-access': 'write',
        'data-onauth': `${LoginWidgetEnum.BotCallbackName}(user)`
    };
}