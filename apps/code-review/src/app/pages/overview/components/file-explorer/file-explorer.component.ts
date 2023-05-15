import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProjectEntity } from '@code-review/shared';

@Component({
    selector: 'acua-file-explorer',
    templateUrl: './file-explorer.component.html',
    styleUrls: ['./file-explorer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileExplorerComponent {
    @Input({ required: true })
    public tree!: ProjectEntity[];
}
