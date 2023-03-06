import { MonacoTreeNodeTypeEnum } from '../enums';

export interface MonacoTreeNode {
    readonly name: string;
    readonly type: MonacoTreeNodeTypeEnum;
    readonly fullPath: string;
    readonly lastModified: number;
    readonly children?: MonacoTreeNode[];
    readonly content?: string;
}

export interface MonacoTreeFolderNode extends Omit<MonacoTreeNode, 'content'> {
    children: MonacoTreeNode[];
}

export interface MonacoTreeFileNode extends Omit<MonacoTreeNode, 'children'> {
    content: string;
}
