import { Card } from '@/components/ui/card';
import { Activity, Clock } from 'lucide-react';

interface Props {
    image: string | null;
    prompt: string;
    style: string;
}

export default function Preview({ image, prompt, style }: Props) {
    return (
        <section aria-label="Preview" className="px-8 py-4 w-full">
            <Card className="p-4">
                <div className="flex items-center gap-2 font-semibold">
                    <Activity className="h-5 w-5 text-accent" />
                    <h2>Live Summary</h2>
                </div>
                {image ? (
                    <img
                        src={image}
                        alt="Preview of uploaded"
                        className="max-h-64 object-contain mx-auto"
                    />
                ) : (
                    <p className="text-gray-500">No image uploaded</p>
                )}
                <div>
                    <p>
                        <span className="font-medium">Prompt:</span> {prompt || '—'}
                    </p>
                    <p>
                        <span className="font-medium">Style:</span> {style}
                    </p>
                </div>
            </Card>
        </section>
    );
}
