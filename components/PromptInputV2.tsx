'use client';
import {
    PromptInput,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
} from '@/components/ui/shadcn-io/ai/prompt-input';
import { useRef, useEffect, type FormEventHandler, useState } from 'react';
import Upload from '@/components/Upload';
import StyleSelector from '@/components/StyleSelector';
import GenerateButton from '@/components/GenerateButton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
    };

    return (
        <section aria-label="Chat Input" className="px-8 py-4 w-full">
            <PromptInput onSubmit={handleSubmit}>
                <PromptInputTextarea
                    ref={textareaRef}
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                    placeholder="Describe the style, setting, and mood you want for your fashion visual. Be specific about lighting, background, and aesthetic..."
                />

                <PromptInputToolbar>
                    <PromptInputTools>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <Upload onImageSelect={onImageSelect} />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Upload Image</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <StyleSelector style={style} setStyle={setStyle} />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Select a Style</p>
                            </TooltipContent>
                        </Tooltip>
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

//@ts-ignore
export default PromptInputV2;
