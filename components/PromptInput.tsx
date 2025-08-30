import { PromptInputTextarea } from '@/components/ui/shadcn-io/ai/prompt-input';

interface Props {
    prompt: string;
    setPrompt: (v: string) => void;
}

export default function PromptInput({ prompt, setPrompt }: Props) {
    return (
        <PromptInputTextarea
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            placeholder="Describe your idea..."
        />
    );
}
