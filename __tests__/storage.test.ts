import { saveToHistory, loadHistory } from '@/lib/storage';

const KEY = 'ai_history';

const mockItem = (id: string) => ({
    id,
    imageUrl: `url-${id}`,
    prompt: `prompt-${id}`,
    style: 'Editorial',
    createdAt: new Date().toISOString(),
});

describe('storage helpers', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.restoreAllMocks();
    });

    it('should save an item into localStorage', () => {
        const item = mockItem('1');

        saveToHistory(item);

        const raw = localStorage.getItem(KEY);
        expect(raw).not.toBeNull();

        const parsed = JSON.parse(raw as string);
        expect(parsed[0]).toMatchObject(item);
    });

    it('should prepend items and keep only the last 5', () => {
        // Add 6 items
        for (let i = 0; i < 6; i++) {
            saveToHistory(mockItem(String(i)));
        }

        const history = loadHistory();
        expect(history).toHaveLength(5);
        expect(history[0].id).toBe('5'); // last added at front
        expect(history[4].id).toBe('1'); // oldest retained
    });

    it('should load an empty array if nothing in localStorage', () => {
        const history = loadHistory();
        expect(history).toEqual([]);
    });

    it('should handle corrupted JSON gracefully', () => {
        localStorage.setItem(KEY, '{invalid json}');
        expect(loadHistory()).toEqual([]);
    });

    it('should dispatch a storage event on save', () => {
        const spy = jest.fn();
        window.addEventListener('storage', spy);

        saveToHistory(mockItem('10'));

        expect(spy).toHaveBeenCalled();
    });
});
