import { downscaleImage } from '@/lib/image';

// Helper to create a fake File object
function createFakeFile() {
    const blob = new Blob(['dummy content'], { type: 'image/png' });
    return new File([blob], 'test.png', { type: 'image/png' });
}

describe('downscaleImage', () => {
    let originalImage: any;
    let originalFileReader: any;

    beforeAll(() => {
        originalImage = (global as any).Image;
        originalFileReader = (global as any).FileReader;
    });

    afterAll(() => {
        (global as any).Image = originalImage;
        (global as any).FileReader = originalFileReader;
    });

    it('should resolve with a DataURL when image loads', async () => {
        // Mock canvas API
        const toDataURLMock = jest.fn(() => 'data:image/jpeg;base64,fake');
        const getContextMock = jest.fn(() => ({ drawImage: jest.fn() }));

        (global as any).document.createElement = jest.fn((tag: string) => {
            if (tag === 'canvas') {
                return {
                    getContext: getContextMock,
                    toDataURL: toDataURLMock,
                    width: 0,
                    height: 0,
                };
            }
            return {};
        });

        // Mock <img>
        (global as any).Image = class {
            width = 4000;
            height = 2000;
            onload: (() => void) | null = null;
            onerror: (() => void) | null = null;
            set src(_) {
                // Immediately trigger "load"
                setTimeout(() => this.onload && this.onload());
            }
        };

        // Mock FileReader
        (global as any).FileReader = class {
            result: string = 'data:image/png;base64,fakeSrc';
            onload: ((this: FileReader, ev: any) => any) | null = null;
            onerror: ((this: FileReader, ev: any) => any) | null = null;
            readAsDataURL() {
                // Immediately call onload
                this.onload?.({ target: { result: this.result } });
            }
        };

        const fakeFile = createFakeFile();
        const result = await downscaleImage(fakeFile, 1920);

        expect(result).toBe('data:image/jpeg;base64,fake');
        expect(toDataURLMock).toHaveBeenCalledWith('image/jpeg', 0.9);
    });

    it('should reject if FileReader errors', async () => {
        (global as any).FileReader = class {
            onload: (() => void) | null = null;
            onerror: (() => void) | null = null;
            readAsDataURL() {
                this.onerror?.(new Error('File read failed'));
            }
        };

        const fakeFile = createFakeFile();
        await expect(downscaleImage(fakeFile, 1920)).rejects.toThrow('File read failed');
    });

    it('should reject if Image fails to load', async () => {
        (global as any).Image = class {
            onload: (() => void) | null = null;
            onerror: (() => void) | null = null;
            set src(_) {
                this.onerror && this.onerror(new Error('Image load failed'));
            }
        };

        (global as any).FileReader = class {
            result: string = 'data:image/png;base64,fakeSrc';
            onload: ((this: FileReader, ev: any) => any) | null = null;
            readAsDataURL() {
                this.onload?.({ target: { result: this.result } });
            }
        };

        const fakeFile = createFakeFile();
        await expect(downscaleImage(fakeFile, 1920)).rejects.toThrow('Image load failed');
    });
});
