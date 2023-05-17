import { Injectable, inject } from '@angular/core';
import { ProjectEntity, ProjectEntityTypeEnum } from '@code-review/shared';
import { InitialFoldersOpenedService } from '../services';
import { ProjectFileSelectionState } from '../states';

@Injectable()
export class InitialFoldersFacade {
    private readonly foldersOpenedService = inject(InitialFoldersOpenedService);
    private readonly fileSelectionState = inject(ProjectFileSelectionState);

    public setFileFromQuery(
        queryFile: string,
        entities: ProjectEntity[]
    ): void {
        const entityPaths = queryFile.split('/');
        const matchedEntities = this.findFilesByEntityPaths(
            entityPaths,
            entities
        );

        matchedEntities.forEach((entity) => {
            if (entity.type === ProjectEntityTypeEnum.Folder) {
                this.foldersOpenedService.setState(entity.fullPath, true);
            } else {
                this.fileSelectionState.set(entity);
            }
        });
    }

    private findFilesByEntityPaths(
        entityPaths: string[],
        entities: ProjectEntity[]
    ): ProjectEntity[] {
        const result: ProjectEntity[] = [];
        let currentChildren = entities;

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
