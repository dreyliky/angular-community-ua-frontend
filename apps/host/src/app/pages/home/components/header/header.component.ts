import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppRouteEnum } from '@host/core';

@Component({
    selector: 'acua-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'mat-elevation-z1'
    }
})
export class HeaderComponent {
    protected readonly homePagePath = `/${AppRouteEnum.Home}`;
}
