import { Injectable } from '@angular/core';
import { FileCommentAmountDictionary } from '@code-review/shared';
import { NgxState, ObjectState } from 'ngx-base-state';
import { filter, Observable } from 'rxjs';

@NgxState()
@Injectable()
export class EditorCommentsState extends ObjectState<FileCommentAmountDictionary> {
    public readonly actualData$ = this.data$.pipe(
        filter((data) => !!data)
    ) as Observable<FileCommentAmountDictionary>;

    public get lines(): number[] {
        return this._lines;
    }

    private _lines: number[] = [];

    public override set(data: FileCommentAmountDictionary): void {
        this.initLines(data);
        super.set(data);
    }

    public getEntries(): [string, number][] {
        return Object.entries(this.data!);
    }

    public getAmount(lineNumber: number): number {
        return this.data![lineNumber] ?? 0;
    }

    private initLines(data: FileCommentAmountDictionary): void {
        this._lines = Object.keys(data).map((line) => +line);
    }
}
