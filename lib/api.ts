import { toast } from 'sonner';

export async function mockGenerate(
    body: { imageDataUrl: string | null; prompt: string; style: string },
    signal?: AbortSignal,
    attempt = 1,
): Promise<any> {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) return reject(new DOMException('Aborted', 'AbortError'));

        setTimeout(
            () => {
                if (signal?.aborted) return reject(new DOMException('Aborted', 'AbortError'));

                // 20% chance of error
                if (Math.random() < 0.2) {
                    if (attempt > 1) {
                        toast.warning('Model overloaded');
                        toast.info('Retrying...');
                    }
                    if (attempt >= 3) {
                        return reject({ message: 'Max retry attempt exhausted. Request Aborted.' });
                    }
                    // Retry with exponential backoff
                    const delay = Math.pow(2, attempt) * 500;
                    return setTimeout(() => {
                        mockGenerate(body, signal, attempt + 1)
                            .then(resolve)
                            .catch(reject);
                    }, delay);
                }

                resolve({
                    id: crypto.randomUUID(),
                    imageUrl: body.imageDataUrl,
                    prompt: body.prompt,
                    style: body.style,
                    createdAt: new Date().toISOString(),
                });
            },
            1000 + Math.random() * 1000,
        );
    });
}
