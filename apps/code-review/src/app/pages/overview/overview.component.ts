import { ScreenService } from '@acua/shared';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    signal
} from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { DependenciesFacade } from './facades';
import { PAGE_PROVIDERS } from './providers';

@Component({
    selector: 'acua-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: PAGE_PROVIDERS
})
export class OverviewComponent {
    public readonly dependencies$ = this.dependenciesFacade.initAll();
    public readonly isMobile = this.screenService.isMatch(['XSmall']);
    public readonly isSidenavOpened = signal(!this.isMobile());

    public readonly drawerMode = computed<MatDrawerMode>(() =>
        this.isMobile() ? 'over' : 'side'
    );

    constructor(
        private readonly screenService: ScreenService,
        private readonly dependenciesFacade: DependenciesFacade
    ) {}

    public onHeaderHamburgerMenuButtonClick(): void {
        this.isSidenavOpened.update((state) => !state);
    }
}
