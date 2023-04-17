import { Injectable } from '@angular/core';
import { StorageService } from '../../../services';

@Injectable({
    providedIn: 'root'
})
export class BearerTokenService {
    private readonly storageKey = 'access_token';

    constructor(private readonly storageService: StorageService) {}

    public get(): string {
        return this.storageService.get<string>(this.storageKey);
    }

    public set(token: string): void {
        this.storageService.set(this.storageKey, token);
    }
}
