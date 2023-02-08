import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'acua-header',
    templateUrl: './acua-header.component.html',
    styleUrls: ['./acua-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {}
