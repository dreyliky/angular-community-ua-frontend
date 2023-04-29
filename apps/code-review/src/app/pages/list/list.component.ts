import { ScreenService } from '@acua/shared';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
    selector: 'acua-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
    protected readonly isMobile$ = inject(ScreenService).isMatch$(['XSmall']);
}
