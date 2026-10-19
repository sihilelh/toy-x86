import React from "react"

interface BannerProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

export default function Banner({ icon: Icon, title, description }: BannerProps) {
    return <div className="border-2 border-border bg-card p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
                <div className="flex items-center gap-2">
                    <Icon className="size-5 text-primary stroke-[2.5]" />
                    <h1 className="font-head text-2xl font-bold tracking-tight">
                        {title}
                    </h1>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    </div>
}