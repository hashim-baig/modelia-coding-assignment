import { useEffect, useState } from 'react';
import { loadHistory } from '@/lib/storage';
import { Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface HistoryItem {
    id: string;
    imageUrl: string;
    prompt: string;
    style: string;
    createdAt: string;
}

interface Props {
    onSelect: (item: HistoryItem) => void;
}

export default function History({ onSelect }: Props) {
    const [items, setItems] = useState<HistoryItem[]>([]);

    useEffect(() => {
        setItems(loadHistory());
        window.addEventListener('storage', () => setItems(loadHistory()));
        return () => window.removeEventListener('storage', () => setItems(loadHistory()));
    }, []);

    if (items.length === 0)
        return (
            <section aria-label="History" className="px-8 py-4 w-full">
                <Card className="p-8 bg-muted/30">
                    <div className="flex items-center gap-2 font-semibold">
                        <Clock className="h-5 w-5 text-accent" />
                        <h2>No History Yet</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Your Prompts will appear here for quick access
                    </p>
                </Card>
            </section>
        );

    return (
        <section aria-label="History" className="px-8 py-4 w-full">
            <Card className="p-4 bg-muted/30">
                <div>
                    <div className="flex items-center gap-2 font-semibold">
                        <Clock className="h-5 w-5 text-accent" />
                        <h2>History (last 5)</h2>
                    </div>
                    <span className="text-sm text-gray-600">
                        Click on history item to restore it in the main preview.
                    </span>
                </div>
                <ul className="space-y-2">
                    {items.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => onSelect(item)}
                                className="flex items-center gap-3 w-full text-left p-2 rounded hover:bg-gray-100 focus:ring-2 cursor-pointer"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt="Generated result"
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                    <p className="font-medium">{item.prompt}</p>
                                    <p className="text-sm text-gray-500">{item.style}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            </Card>
        </section>
    );
}
