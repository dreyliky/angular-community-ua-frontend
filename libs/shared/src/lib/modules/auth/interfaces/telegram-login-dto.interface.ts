export interface TelegramLoginDto {
    readonly id: number;
    readonly first_name: string;
    readonly last_name: string;
    readonly username: string;
    readonly photo_url: string;
    readonly auth_date: number;
    readonly hash: string;
}
