import { LoginService, TelegramLoginDto } from '@acua/shared/auth';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@host/core';
import { LoginErrorHandler } from './services';

@Component({
    selector: 'acua-auth',
    templateUrl: './acua-auth.component.html',
    styleUrls: ['./acua-auth.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [LoginErrorHandler]
})
export class AuthComponent {
    constructor(
        private readonly loginService: LoginService,
        private readonly router: Router,
        private readonly loginErrorHandler: LoginErrorHandler
    ) {}

    public onTelegramLogin(data: TelegramLoginDto): void {
        this.loginService.loginByTelegram(data).subscribe({
            next: () => this.router.navigateByUrl(`/${AppRouteEnum.Home}`),
            error: (error) => this.loginErrorHandler.handle(error)
        });
    }
}
