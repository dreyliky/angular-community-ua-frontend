import { MarkdownSyntaxEnum } from '../enums';
import { MarkdownButton } from '../interfaces/markdown-button.interface';

export class HeaderButtonClass implements MarkdownButton {
    public readonly enumMember = MarkdownSyntaxEnum.Header;
    public readonly matIconName = 'text_fields';
}
