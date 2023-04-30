import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'acua-absent-data',
    templateUrl: './absent-data.component.html',
    styleUrls: ['./absent-data.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbsentDataComponent {}
