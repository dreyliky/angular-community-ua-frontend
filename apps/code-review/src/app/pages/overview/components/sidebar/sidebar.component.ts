import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectEntitiesState } from '../../states';

@Component({
    selector: 'acua-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'cr-overview-sidebar'
    }
})
export class SidebarComponent {
    public readonly projectEntities = toSignal(this.projectEntitiesState.data$);

    constructor(private readonly projectEntitiesState: ProjectEntitiesState) {}
}
