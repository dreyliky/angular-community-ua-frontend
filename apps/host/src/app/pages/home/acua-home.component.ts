import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'acua-home',
    templateUrl: './acua-home.component.html',
    styleUrls: ['./acua-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {}
