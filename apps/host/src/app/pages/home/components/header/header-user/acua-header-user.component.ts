import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'acua-header-user',
    templateUrl: './acua-header-user.component.html',
    styleUrls: ['./acua-header-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserComponent {
    public isHeaderMenuActive = false;

    public onToggleHeaderMenu(): void {
        this.isHeaderMenuActive = !this.isHeaderMenuActive;
    }
}
