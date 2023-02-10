import {
    ChangeDetectionStrategy,
    Component, Input
} from '@angular/core';
import { LoginWidgetConfig } from '../../interfaces/login-widget.interface';

@Component({
    selector: 'acua-login-widget',
    templateUrl: './login-widget.component.html',
    styleUrls: ['./login-widget.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginWidgetComponent {
    @Input()
    public widgetConfig!: LoginWidgetConfig;

    public onTelegramLogin(event: any): void {
        console.log(event);
    }
}
