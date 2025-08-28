import { useEffect, useState } from 'react';
import { loadHistory } from '@/lib/storage';

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

    if (items.length === 0) return null;

    return (
        <section aria-label="History" className="border rounded p-4 space-y-3">
            <h2 className="font-semibold">History (last 5)</h2>
            <ul className="space-y-2">
                {items.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => onSelect(item)}
                            className="flex items-center gap-3 w-full text-left p-2 rounded hover:bg-gray-100 focus:ring-2"
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
        </section>
    );
}
