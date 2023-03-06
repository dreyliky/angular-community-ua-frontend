import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MonacoTreeFileNode } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class FileSelectionService {
    private _data$: BehaviorSubject<MonacoTreeFileNode | null>
        = new BehaviorSubject<MonacoTreeFileNode | null>(null);

    public get data$(): Observable<MonacoTreeFileNode | null> {
        return this._data$.asObservable();
    }

    public setData(node: MonacoTreeFileNode): void {
        this._data$.next(node);
    }
}
