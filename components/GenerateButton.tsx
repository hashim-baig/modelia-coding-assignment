import React, { useState } from 'react';
import { mockGenerate } from '@/lib/api';
import { saveToHistory } from '@/lib/storage';
import { PromptInputSubmit } from '@/components/ui/shadcn-io/ai/prompt-input';

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
    const [err, setErr] = useState<string | null>(null);
    const [controller, setController] = useState<AbortController | null>(null);

    const handleSubmit = async () => {
        if (!image || !prompt) {
            alert('Must upload an image and provide a prompt.');
            return;
        }

        setErr(null);
        setStatus('submitted');

        const ctrl = new AbortController();
        setController(ctrl);

        try {
            setStatus('streaming'); // once request starts

            const result = await mockGenerate({ imageDataUrl: image, prompt, style }, ctrl.signal);

            saveToHistory(result);

            setStatus('ready');
            setPrompt('');
        } catch (e: any) {
            if (e.name === 'AbortError') {
                setErr('Request aborted.');
                setStatus('ready'); // ✅ go back to ready instead of error
            } else {
                setErr(e.message || 'Error generating');
                setStatus('error'); // real error
            }
        } finally {
            setController(null);
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
            />

            {err && <p className="text-red-600 text-sm">{err}</p>}
        </div>
    );
}
