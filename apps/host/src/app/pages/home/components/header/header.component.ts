import { UserService } from '@acua/shared';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppRouteEnum } from '@host/core';

@Component({
    selector: 'acua-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    protected readonly user$ = this.userService.data$;
    protected readonly homePagePath = `/${AppRouteEnum.Home}`;

    constructor(private readonly userService: UserService) {}
}
