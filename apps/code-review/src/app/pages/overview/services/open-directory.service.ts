import { Injectable, inject } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { OpenDirectoryState } from '../states';

@Injectable()
export class OpenDirectoryService {
    private readonly state = inject(OpenDirectoryState);

    public setOpenDirectoryState(fileFullPath: string, state: boolean): any {
        this.state.set({
            ...this.state.data,
            [fileFullPath]: state
        });
    }

    public getOpenDirectoryState(fileFullPath: string): Observable<boolean> {
        return this.state.data$.pipe(
            filter(Boolean),
            map((dictionary) => dictionary[fileFullPath]),
            filter(Boolean)
        );
    }
}
