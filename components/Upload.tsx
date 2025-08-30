import { useRef } from 'react';
import { downscaleImage } from '@/lib/image';
import { PromptInputButton } from '@/components/ui/shadcn-io/ai/prompt-input';
import { PaperclipIcon } from 'lucide-react';

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

    const handleClick = () => {
        fileRef.current?.click();
    };

    return (
        <div>
            <PromptInputButton onClick={handleClick}>
                <PaperclipIcon size={16} />
            </PromptInputButton>

            <input
                type="file"
                id="fileUpload"
                ref={fileRef}
                accept="image/png,image/jpeg"
                onChange={handleFile}
                className="hidden"
            />
        </div>
    );
}
