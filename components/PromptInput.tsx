interface Props {
    prompt: string;
    setPrompt: (v: string) => void;
}

export default function PromptInput({ prompt, setPrompt }: Props) {
    return (
        <div>
            <label htmlFor="promptInput" className="block font-medium mb-1">
                Prompt
            </label>
            <input
                type="text"
                id="promptInput"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your idea..."
                className="w-full border rounded px-3 py-2 focus:outline focus:ring-2"
            />
        </div>
    );
}
