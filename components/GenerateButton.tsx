import { useState } from 'react';
import { mockGenerate } from '@/lib/api';
import { saveToHistory } from '@/lib/storage';

interface Props {
    image: string | null;
    prompt: string;
    style: string;
}

export default function GenerateButton({ image, prompt, style }: Props) {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [controller, setController] = useState<AbortController | null>(null);

    async function handleGenerate() {
        if (!image || !prompt) {
            alert('Must upload an image and provide a prompt.');
            return;
        }

        setErr(null);
        setLoading(true);

        const ctrl = new AbortController();
        setController(ctrl);

        try {
            const result = await mockGenerate({ imageDataUrl: image, prompt, style }, ctrl.signal);
            saveToHistory(result);
        } catch (e: any) {
            if (e.name === 'AbortError') {
                setErr('Request aborted.');
            } else {
                setErr(e.message || 'Error generating');
            }
        } finally {
            setLoading(false);
            setController(null);
        }
    }

    function handleAbort() {
        controller?.abort();
    }

    return (
        <div className="flex items-center space-x-4">
            <button
                disabled={loading}
                onClick={handleGenerate}
                className="bg-blue-600 text-white px-4 py-2 rounded focus:outline focus:ring-2"
            >
                {loading ? 'Generating...' : 'Generate'}
            </button>

            {loading && (
                <button onClick={handleAbort} className="bg-red-500 text-white px-3 py-2 rounded">
                    Abort
                </button>
            )}

            {err && <p className="text-red-600 text-sm">{err}</p>}
        </div>
    );
}
