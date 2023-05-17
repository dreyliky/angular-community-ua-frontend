import { Injectable, inject } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { InitialFoldersOpenedState } from '../states';

@Injectable()
export class InitialFoldersOpenedService {
    private readonly state = inject(InitialFoldersOpenedState);

    public setState(fileFullPath: string, state: boolean): void {
        this.state.setItem(fileFullPath, state);
    }

    public getState(fileFullPath: string): Observable<boolean> {
        return this.state.data$.pipe(
            filter(Boolean),
            map((dictionary) => dictionary[fileFullPath]),
            filter(Boolean)
        );
    }
}
