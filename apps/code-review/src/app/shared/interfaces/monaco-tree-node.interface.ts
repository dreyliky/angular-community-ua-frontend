import { ProjectEntityTypeEnum } from '../enums';

interface BaseProjectEntity {
    readonly name: string;
    readonly type: ProjectEntityTypeEnum;
    readonly fullPath: string;
    readonly lastModified: number;
}

export interface ProjectFolder extends BaseProjectEntity {
    readonly children: ProjectEntity[];
}

export interface ProjectFile extends BaseProjectEntity {
    readonly content: string;
}

export type ProjectEntity = ProjectFolder & ProjectFile;
