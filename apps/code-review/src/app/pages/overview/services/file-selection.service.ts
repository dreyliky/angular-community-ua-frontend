import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectFile } from '@code-review/shared';
import { defer } from 'rxjs';
import { OverviewQueryParamEnum } from '../enums';
import { ProjectFileSelectionState } from '../states';

@Injectable()
export class FileSelectionService {
    public readonly data$ = defer(() => this.state.data$);

    public get data(): ProjectFile | null {
        return this.state.data;
    }

    private readonly state = inject(ProjectFileSelectionState);
    private readonly router = inject(Router);

    public set(data: ProjectFile): void {
        this.state.set(data);
        this.router.navigate([], {
            queryParams: { [OverviewQueryParamEnum.File]: data.fullPath }
        });
    }
}
