export interface FileCommentAmountDictionary {
    readonly [lineNumber: string]: number;
}

export interface ReviewRequestCommentAmountDictionary {
    readonly [fileFullPath: string]: FileCommentAmountDictionary;
}
