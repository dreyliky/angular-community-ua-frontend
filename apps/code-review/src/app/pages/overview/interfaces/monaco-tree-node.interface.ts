import { MonacoTreeNodeTypeEnum } from '../enums';

export interface MonacoTreeNode {
    name: string;
    type: MonacoTreeNodeTypeEnum;
    fullPath: string;
    lastModified: number;
    children?: MonacoTreeNode[];
    content?: string;
}

export interface MonacoTreeFolderNode extends MonacoTreeNode {
    children: MonacoTreeNode[];
}

export interface MonacoTreeFileNode extends MonacoTreeNode {
    content: string;
}
