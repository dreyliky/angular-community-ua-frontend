import {
    ChangeDetectionStrategy,
    Component, Input
} from '@angular/core';
import { LoginWidgetConfig } from '../../interfaces/login-widget.interface';
import { User } from '../../interfaces/user.interface';

@Component({
    selector: 'acua-login-widget',
    templateUrl: './login-widget.component.html',
    styleUrls: ['./login-widget.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginWidgetComponent {
    @Input()
    public widgetConfig!: LoginWidgetConfig;

    public onTelegramLogin(event: User): void {
        console.log(event);
    }
}
