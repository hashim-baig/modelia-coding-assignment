'use client';
import { useState } from 'react';
import Upload from '@/components/Upload';
import PromptInput from '@/components/PromptInput';
import StyleSelector from '@/components/StyleSelector';
import Preview from '@/components/Preview';
import GenerateButton from '@/components/GenerateButton';
import History from '@/components/History';
import ErrorBoundary from '@/components/ErrorBoundary';
import HeroSection from '@/components/HeroSection';

export default function Home() {
    const [image, setImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [style, setStyle] = useState('Editorial');

    return (
        <ErrorBoundary>
            <main className="min-h-screen bg-gradient-subtle">
                <HeroSection />
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col gap-8">
                        <Upload onImageSelect={setImage} />
                        <PromptInput prompt={prompt} setPrompt={setPrompt} />
                        <StyleSelector style={style} setStyle={setStyle} />

                        <Preview image={image} prompt={prompt} style={style} />

                        <GenerateButton image={image} prompt={prompt} style={style} />
                        <History
                            onSelect={(item) => {
                                setImage(item.imageUrl);
                                setPrompt(item.prompt);
                                setStyle(item.style);
                            }}
                        />
                    </div>
                </div>
            </main>
        </ErrorBoundary>
    );
}
