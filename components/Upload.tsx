import { useRef } from 'react';
import { downscaleImage } from '@/lib/image';

interface Props {
    onImageSelect: (dataUrl: string | null) => void;
}

export default function Upload({ onImageSelect }: Props) {
    const fileRef = useRef<HTMLInputElement>(null);

    async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 10_000_000) {
            alert('File too large (max 10MB)');
            return;
        }

        const dataUrl = await downscaleImage(file, 1920);
        onImageSelect(dataUrl);
    }

    return (
        <div>
            <label htmlFor="fileUpload" className="block font-medium mb-1">
                Upload Image
            </label>
            <input
                type="file"
                id="fileUpload"
                ref={fileRef}
                accept="image/png,image/jpeg"
                onChange={handleFile}
                className="border p-2 rounded focus:outline focus:ring-2"
            />
        </div>
    );
}
