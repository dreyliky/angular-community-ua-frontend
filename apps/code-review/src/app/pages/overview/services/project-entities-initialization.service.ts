import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectEntity, ProjectEntityTypeEnum } from '@code-review/shared';
import { OverviewQueryParamEnum } from '../enums';
import {
    InitialFoldersOpenedState,
    ProjectEntitiesState,
    ProjectFileSelectionState
} from '../states';

@Injectable()
export class ProjectEntitiesInitializationService {
    private readonly foldersOpenedStatusService = inject(
        InitialFoldersOpenedState
    );

    private readonly fileSelectionState = inject(ProjectFileSelectionState);
    private readonly projectEntitiesState = inject(ProjectEntitiesState);
    private readonly activatedRoute = inject(ActivatedRoute);

    private get openedFileFullPath(): string | undefined {
        return this.activatedRoute.snapshot.queryParams[
            OverviewQueryParamEnum.File
        ];
    }

    public initByUrlQueryParams(): void {
        if (this.openedFileFullPath) {
            this.selectTargetFileAndOpenParentFolders();
        }
    }

    private selectTargetFileAndOpenParentFolders(): void {
        const entityPaths = this.openedFileFullPath!.split('/');
        const matchedEntities = this.findFilesByEntityPaths(entityPaths);

        matchedEntities.forEach((entity) => {
            if (entity.type === ProjectEntityTypeEnum.Folder) {
                this.foldersOpenedStatusService.setItem(entity.fullPath, true);
            } else {
                this.fileSelectionState.set(entity);
            }
        });
    }

    private findFilesByEntityPaths(entityPaths: string[]): ProjectEntity[] {
        const result: ProjectEntity[] = [];
        let currentChildren = this.projectEntitiesState.data!;

        entityPaths.forEach((entityName) => {
            const matchedEntity = currentChildren?.find(
                (file) => file.name === entityName
            );

            if (matchedEntity) {
                currentChildren = matchedEntity.children ?? [];
                result.push(matchedEntity);
            }
        });

        return result;
    }
}
