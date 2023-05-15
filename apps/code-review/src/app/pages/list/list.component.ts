import { ScreenService } from '@acua/shared';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'acua-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'acua-page'
    }
})
export class ListComponent {
    public readonly descriptionControl = new FormControl('123');
    protected readonly isMobile = inject(ScreenService).isMatch(['XSmall']);
}
