type LoginWidgetButtonSize = 'large' | 'medium' | 'small';

export interface LoginWidgetConfig {
    'src': string;
    'data-telegram-login': string,
    'data-size': LoginWidgetButtonSize;
    'data-onauth': string,
    'data-request-access': string,
}
