import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProjectEntity } from '@code-review/shared';

@Component({
    selector: 'acua-entity-nodes',
    templateUrl: './entity-nodes.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityNodesComponent {
    @Input({ required: true })
    public tree!: ProjectEntity[];

    @Input()
    public depth: number = 0;

    public trackByFn(index: number, entity: ProjectEntity): string {
        return entity.fullPath;
    }
}
