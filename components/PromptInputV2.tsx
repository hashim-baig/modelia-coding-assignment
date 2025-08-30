'use client';
import {
    PromptInput,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
} from '@/components/ui/shadcn-io/ai/prompt-input';
import { type FormEventHandler, useState } from 'react';
import Upload from '@/components/Upload';
import StyleSelector from '@/components/StyleSelector';

interface Props {
    onImageSelect: (dataUrl: string | null) => void;
    style: string;
    setStyle: (v: string) => void;
    prompt: string;
    setPrompt: (v: string) => void;
}

const PromptInputV2 = ({ onImageSelect, style, setStyle, prompt, setPrompt }: Props) => {
    const [text, setText] = useState<string>('');
    const [status, setStatus] = useState<'submitted' | 'streaming' | 'ready' | 'error'>('ready');
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (!text) {
            return;
        }
        setStatus('submitted');
        setTimeout(() => {
            setStatus('streaming');
        }, 200);
        setTimeout(() => {
            setStatus('ready');
            setText('');
        }, 2000);
    };

    return (
        <div className="p-8 w-full">
            <PromptInput onSubmit={handleSubmit}>
                <PromptInputTextarea
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                    placeholder="Describe your idea..."
                />

                <PromptInputToolbar>
                    <PromptInputTools>
                        <Upload onImageSelect={onImageSelect} />

                        <StyleSelector style={style} setStyle={setStyle} />
                    </PromptInputTools>
                    <PromptInputSubmit disabled={!text} status={status} />
                </PromptInputToolbar>
            </PromptInput>
        </div>
    );
};
export default PromptInputV2;
