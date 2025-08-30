import { Palette, Sparkles } from 'lucide-react';

export default function HeroSection() {
    return (
        <div className="relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `url('/hero-image.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div className="relative container mx-auto px-4 py-16">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="p-3 gradient-primary-bg rounded-xl">
                            <Palette className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <h1 className="text-4xl font-bold gradient-primary-bg  bg-clip-text text-transparent">
                            Modelia AI Studio
                        </h1>
                    </div>
                    <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        Transform your fashion products with AI-powered visual generation. Create
                        stunning editorial shots, streetwear campaigns, and luxury lookbooks in
                        seconds.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="h-4 w-4" />
                        <span>Professional fashion visuals powered by advanced AI</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
