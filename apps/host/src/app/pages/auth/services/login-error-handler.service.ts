import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class LoginErrorHandler {
    private readonly errorHandlerMap = new Map<HttpStatusCode | 0, Function>([
        [0, this.handleUnknownError],
        [HttpStatusCode.BadRequest, this.handleBadRequest],
        [HttpStatusCode.InternalServerError, this.handleInternalServerError]
    ]);

    constructor(private readonly snackBar: MatSnackBar) {}

    public handle(httpError: HttpErrorResponse): void {
        const errorHandler = this.errorHandlerMap.get(httpError.status);

        errorHandler?.call(this);
    }

    private handleUnknownError(): void {
        this.snackBar.open(`Невідома проблема. Будемо вдячні за сповіщення адміна про це.`);
    }

    private handleBadRequest(): void {
        this.snackBar.open(`Не вдалося підтвердити справжність переданих даних.`);
    }

    private handleInternalServerError(): void {
        this.snackBar.open(`Не вдалось Вас авторизувати. Вже шукаємо проблему.`);
    }
}
