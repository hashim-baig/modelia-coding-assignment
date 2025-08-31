'use client';
import {
    PromptInput,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
} from '@/components/ui/shadcn-io/ai/prompt-input';
import { type FormEventHandler, useState } from 'react';
import Upload from '@/components/Upload';
import StyleSelector from '@/components/StyleSelector';
import GenerateButton from '@/components/GenerateButton';

interface Props {
    onImageSelect: (dataUrl: string | null) => void;
    style: string;
    setStyle: (v: string) => void;
    prompt: string;
    setPrompt: (v: string) => void;
    image: string | null;
}

const PromptInputV2 = ({ onImageSelect, style, setStyle, prompt, setPrompt, image }: Props) => {
    const [status, setStatus] = useState<'submitted' | 'streaming' | 'ready' | 'error'>('ready');

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
    };

    return (
        <section aria-label="Chat Input" className="px-8 py-4 w-full">
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

                    <GenerateButton
                        image={image}
                        prompt={prompt}
                        style={style}
                        setPrompt={setPrompt}
                        status={status}
                        setStatus={setStatus}
                    />
                </PromptInputToolbar>
            </PromptInput>
        </section>
    );
};
export default PromptInputV2;
