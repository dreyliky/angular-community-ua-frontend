import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    public get<T>(key: string): T {
        const data = localStorage.getItem(key);

        return data ? JSON.parse(data) : null;
    }

    public set<T>(key: string, data: T): void {
        const body = JSON.stringify(data);

        localStorage.setItem(key, body);
    }

    public remove(key: string): void {
        localStorage.removeItem(key);
    }

    public clear(): void {
        localStorage.clear();
    }
}
