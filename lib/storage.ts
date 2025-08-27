const KEY = 'ai_history';

interface HistoryItem {
    id: string;
    imageUrl: string;
    prompt: string;
    style: string;
    createdAt: string;
}

export function saveToHistory(item: HistoryItem) {
    const existing = loadHistory();
    const updated = [item, ...existing].slice(0, 5); // keep last 5
    localStorage.setItem(KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage')); // so listeners update
}

export function loadHistory(): HistoryItem[] {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}
