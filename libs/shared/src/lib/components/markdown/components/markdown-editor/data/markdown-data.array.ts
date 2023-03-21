import { BoldButtonClass, ItalicButtonClass } from '../classes';
import { HeaderButtonClass } from '../classes/header-button.class';

export const MARKDOWN_BUTTON_ARRAY = [
    {
        buttonClass: new HeaderButtonClass()
    },
    {
        buttonClass: new BoldButtonClass()
    },
    {
        buttonClass: new ItalicButtonClass()
    }
];
