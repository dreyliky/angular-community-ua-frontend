import { MarkdownSyntaxEnum } from '../enums';
import { MarkdownButton } from '../interfaces/markdown-button.interface';

export class ItalicButtonClass implements MarkdownButton {
    public readonly enumMember = MarkdownSyntaxEnum.Italic;
    public readonly matIconName = 'format_italic';
}
