import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@code-review/core';

const ELEMENT_DATA = [
    { name: 'Test1', date: new Date(), user: 'Ivan' },
    { name: 'Test2', date: new Date(), user: 'Petro' },
    { name: 'Test3', date: new Date(), user: 'Vasyl' },
    { name: 'Test4', date: new Date(), user: 'Rostyslav' },
    { name: 'Test5', date: new Date(), user: 'Dima' }
];
@Component({
    selector: 'acua-requests-table',
    templateUrl: './requests-table.component.html',
    styleUrls: ['./requests-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsTableComponent {
    public dataSource = ELEMENT_DATA;
    public displayedColumns: string[] = ['name', 'date', 'user'];

    constructor(private readonly _router: Router) {}

    public handleTableRowClick(id: number): void {
        this._router.navigateByUrl(`/${AppRouteEnum.Overview}/${id}`);
    }
}
