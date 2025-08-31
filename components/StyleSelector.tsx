import {
    PromptInputModelSelect,
    PromptInputModelSelectContent,
    PromptInputModelSelectItem,
    PromptInputModelSelectTrigger,
    PromptInputModelSelectValue,
} from '@/components/ui/shadcn-io/ai/prompt-input';

interface Props {
    style: string;
    setStyle: (v: string) => void;
}

const styles = ['Editorial', 'Streetwear', 'Vintage', 'Minimalist'];

export default function StyleSelector({ style, setStyle }: Props) {
    return (
        <PromptInputModelSelect onValueChange={setStyle} value={style}>
            <PromptInputModelSelectTrigger className="cursor-pointer">
                <PromptInputModelSelectValue />
            </PromptInputModelSelectTrigger>
            <PromptInputModelSelectContent>
                {styles.map((style) => (
                    <PromptInputModelSelectItem
                        key={style}
                        value={style}
                        className="cursor-pointer"
                    >
                        {style}
                    </PromptInputModelSelectItem>
                ))}
            </PromptInputModelSelectContent>
        </PromptInputModelSelect>
    );
}
