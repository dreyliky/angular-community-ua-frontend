import { Injectable, inject } from '@angular/core';
import { FileCommentAmountDictionary } from '@code-review/shared';
import { Observable, filter, map } from 'rxjs';
import { ReviewRequestCommentAmountState } from '../states';

@Injectable()
export class ReviewRequestCommentAmountService {
    private readonly state = inject(ReviewRequestCommentAmountState);

    public getForFileLines(fileFullPath: string): FileCommentAmountDictionary {
        return this.state.data![fileFullPath];
    }

    public isFolderContainAnyCommendedFile(
        folderFullPath: string
    ): Observable<boolean> {
        return this.state.data$.pipe(
            filter(Boolean),
            map((dictionary) =>
                Object.keys(dictionary).some((entityPath) =>
                    entityPath.includes(folderFullPath)
                )
            )
        );
    }

    public getForFile(fileFullPath: string): Observable<number> {
        return this.state.data$.pipe(
            filter(Boolean),
            map((dictionary) => dictionary[fileFullPath]),
            filter(Boolean),
            map((data) =>
                Object.values(data).reduce((accumulator, amount) => {
                    return accumulator + amount;
                }, 0)
            )
        );
    }
}
