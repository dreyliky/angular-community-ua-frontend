import { AuthService, UserService } from '@acua/shared';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeRouteEnum } from '../../../../enums';

@Component({
    selector: 'acua-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent {
    protected readonly user$ = this.userService.data$;
    protected readonly homeRouteEnum = HomeRouteEnum;

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    public onLogoutButtonClick(): void {
        this.authService.logout();
    }
}
