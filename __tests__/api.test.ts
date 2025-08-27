import { mockGenerate } from '@/lib/api';

describe('mockGenerate', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5); // no error by default
        jest.spyOn(global.crypto, 'randomUUID').mockReturnValue('test-uuid');
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('resolves with correct data on success', async () => {
        const promise = mockGenerate({
            imageDataUrl: 'data-url',
            prompt: 'test',
            style: 'Editorial',
        });

        // Fast-forward timers to resolve setTimeout(s)
        jest.runAllTimers();

        const result = await promise;
        expect(result).toEqual({
            id: 'test-uuid',
            imageUrl: 'data-url',
            prompt: 'test',
            style: 'Editorial',
            createdAt: expect.any(String),
        });
    });

    it('retries on simulated errors and eventually resolves', async () => {
        let callCount = 0;
        jest.spyOn(global.Math, 'random').mockImplementation(() => {
            callCount++;
            return callCount < 4 ? 0.1 : 0.5; // error for first 3 then success on 4th
        });

        const promise = mockGenerate({ imageDataUrl: null, prompt: 'retry', style: 'Vintage' });

        // Wait for: initial attempt + 3 retries with delays

        // Initial call timeout
        jest.advanceTimersByTime(1000 + 1000);

        // Retry 1 delay: 2^1 * 500ms = 1000ms
        jest.advanceTimersByTime(1000);

        // Retry 2 delay: 2^2 * 500ms = 2000ms
        jest.advanceTimersByTime(2000);

        // Retry 3 delay: 2^3 * 500ms = 4000ms
        jest.advanceTimersByTime(4000);

        jest.runAllTimers();

        const result = await promise;
        expect(result).toMatchObject({
            prompt: 'retry',
            style: 'Vintage',
        });
        expect(callCount).toBe(4);
    });

    // it("rejects with AbortError when aborted during timeout", (done) => {
    //     const controller = new AbortController();
    //     const promise = mockGenerate({ imageDataUrl: null, prompt: "", style: "" }, controller.signal);
    //
    //     jest.advanceTimersByTime(500);
    //     controller.abort();
    //
    //     setImmediate(() => {
    //         jest.runAllTimers();
    //
    //         promise.catch((err) => {
    //             try {
    //                 expect(err.name).toBe("AbortError");
    //                 done();
    //             } catch (error) {
    //                 done(error);
    //             }
    //         });
    //     });
    // }, 10000); // extend timeout

    it("rejects with 'Model overloaded' error after max retries", async () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.1); // always error (<0.2)

        const promise = mockGenerate({ imageDataUrl: null, prompt: 'fail', style: 'Editorial' });

        // Run timers: repeatedly advance for retries (3 attemps => delays: 1000+random, 2^1*500, 2^2*500)
        jest.advanceTimersByTime(1000 + 1000);
        jest.advanceTimersByTime(2 ** 1 * 500);
        jest.advanceTimersByTime(2 ** 2 * 500);
        jest.runAllTimers();

        await expect(promise).rejects.toEqual({ message: 'Model overloaded' });
    });

    it('rejects with AbortError when aborted before start', async () => {
        const controller = new AbortController();
        controller.abort();

        await expect(
            mockGenerate({ imageDataUrl: null, prompt: '', style: '' }, controller.signal),
        ).rejects.toThrow('Aborted');
    });
});
