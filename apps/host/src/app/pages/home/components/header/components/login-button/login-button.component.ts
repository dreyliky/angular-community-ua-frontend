import { AuthService, TelegramLoginDto } from '@acua/shared';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@host/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription } from 'rxjs';
import { LoginErrorHandler } from '../../services';

@Component({
    selector: 'acua-login-button',
    templateUrl: './login-button.component.html',
    styleUrls: ['./login-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [LoginErrorHandler]
})
export class LoginButtonComponent {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly loginErrorHandler: LoginErrorHandler
    ) {}

    @AutoUnsubscribe()
    public onTelegramLogin(data: TelegramLoginDto): Subscription {
        return this.authService.authByTelegram(data).subscribe({
            next: () => this.router.navigateByUrl(`/${AppRouteEnum.Home}`),
            error: (error) => this.loginErrorHandler.handle(error)
        });
    }
}
