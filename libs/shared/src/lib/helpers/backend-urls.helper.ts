const key = '__acuaBackUrls__';
const windowObj: any = window;

export function registerBackendUrls(urls: string[]): void {
    const newUrls = getBackendUrls();

    urls.forEach((url) => {
        if (!newUrls.includes(url)) {
            newUrls.push(url);
        }
    });

    windowObj[key] = newUrls;
}

export function getBackendUrls(): string[] {
    return windowObj[key] ?? [];
}
