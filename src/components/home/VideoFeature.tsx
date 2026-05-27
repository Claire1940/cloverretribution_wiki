"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";

interface VideoFeatureProps {
  videoId: string;
  title: string;
  posterSrc: string;
}

export function VideoFeature({ videoId, title, posterSrc }: VideoFeatureProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;

  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/30">
        {isPlaying ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group absolute inset-0 h-full w-full text-left"
            aria-label={`Play ${title}`}
          >
            <Image
              src={posterSrc}
              alt={title}
              fill
              priority={false}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition group-hover:bg-[hsl(var(--nav-theme)/0.9)]">
                <Play className="h-7 w-7 fill-current text-white" />
              </div>
              <p className="max-w-2xl text-lg font-semibold text-white md:text-2xl">
                {title}
              </p>
            </div>
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
