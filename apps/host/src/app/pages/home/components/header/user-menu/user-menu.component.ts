import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeRouteEnum } from '@host/pages/home/enums';

@Component({
    selector: 'acua-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent {
    public readonly homeRouteEnum = HomeRouteEnum;
}
