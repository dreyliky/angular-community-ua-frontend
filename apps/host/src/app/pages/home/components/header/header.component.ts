import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppRouteEnum } from '@host/core';

@Component({
    selector: 'acua-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    protected get homePagePath(): string {
        return `/${AppRouteEnum.Home}`;
    }
}
