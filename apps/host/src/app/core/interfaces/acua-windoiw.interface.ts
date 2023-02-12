import { TelegramLoginResponse } from '@host/interfaces';

export interface AcuaWindow extends Window {
    onTelegramLogin?: (response: TelegramLoginResponse) => void;
}
