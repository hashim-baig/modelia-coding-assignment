interface Props {
    image: string | null;
    prompt: string;
    style: string;
}

export default function Preview({ image, prompt, style }: Props) {
    return (
        <section aria-label="Preview" className="border rounded p-4 space-y-3">
            <h2 className="font-semibold">Live Summary</h2>
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
        </section>
    );
}
