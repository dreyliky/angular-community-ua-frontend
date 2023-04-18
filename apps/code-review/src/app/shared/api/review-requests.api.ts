import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CodeReviewRequestStatusEnum } from '../enums';
import { CodeReviewRequest } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ReviewRequestsApi {
    // eslint-disable-next-line max-lines-per-function
    public getAll(): Observable<CodeReviewRequest[]> {
        return of(<CodeReviewRequest[]>[
            {
                id: '1',
                user: {
                    firstName: 'Jane',
                    lastName: 'Doe',
                    photoUrl: '',
                    tgId: 1,
                    username: 'jane.doe'
                },
                title: 'Мій Pet проєкт про кошенят',
                description: 'Подивіться будь ласка і дайте знати що ви думаєте щодо архітектури',
                sourceUrl: 'https://github.com/Nillcon248/ngx-base-state',
                status: CodeReviewRequestStatusEnum.Opened,
                date: new Date().toJSON()
            },
            {
                id: '2',
                user: {
                    firstName: 'Jake',
                    lastName: 'Broe',
                    photoUrl: '',
                    tgId: 2,
                    username: 'jake.broe'
                },
                title: 'Аналог Twitter',
                description: 'Я новачок, то ж цікаво буде почути зауваження',
                sourceUrl: 'https://github.com/dreyliky/ngx-os',
                status: CodeReviewRequestStatusEnum.Opened,
                date: new Date().toJSON()
            }
        ]);
    }
}
