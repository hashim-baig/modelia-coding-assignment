import React, { useState } from 'react';
import { mockGenerate } from '@/lib/api';
import { saveToHistory } from '@/lib/storage';
import { PromptInputSubmit } from '@/components/ui/shadcn-io/ai/prompt-input';
import { toast } from 'sonner';

type ChatStatus = 'submitted' | 'streaming' | 'ready' | 'error';

interface Props {
    image: string | null;
    prompt: string;
    style: string;
    setPrompt: (v: string) => void;
    status: ChatStatus;
    setStatus: React.Dispatch<React.SetStateAction<'submitted' | 'streaming' | 'ready' | 'error'>>;
}

export default function GenerateButton({
    image,
    prompt,
    style,
    setPrompt,
    status,
    setStatus,
}: Props) {
    const [controller, setController] = useState<AbortController | null>(null);

    const handleSubmit = async () => {
        if (!image) {
            toast.error('Must upload an image.');
            return;
        }

        if (!prompt) {
            toast.error('Must provide a prompt.');
            return;
        }

        setStatus('submitted');

        const ctrl = new AbortController();
        setController(ctrl);

        try {
            setStatus('streaming');

            const result = await mockGenerate({ imageDataUrl: image, prompt, style }, ctrl.signal);

            saveToHistory(result);

            setStatus('ready');
            setPrompt('');
        } catch (e: any) {
            if (e.name === 'AbortError') {
                toast.error('Request aborted.');
                setStatus('ready');
            } else {
                toast.error(e.message || 'Error generating');
                setStatus('error');
            }
        } finally {
            setController(null);
            setStatus('ready');
        }
    };

    const handleAbort = () => {
        controller?.abort();
    };

    return (
        <div className="flex items-center space-x-4">
            <PromptInputSubmit
                disabled={!prompt}
                status={status}
                onClick={
                    status === 'ready'
                        ? handleSubmit
                        : status === 'streaming'
                          ? handleAbort
                          : undefined
                }
                className="cursor-pointer"
            />
        </div>
    );
}
