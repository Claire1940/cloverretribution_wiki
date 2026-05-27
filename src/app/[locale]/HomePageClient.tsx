"use client";

import { Suspense, lazy } from "react";
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Link2,
  BellRing,
} from "lucide-react";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({ latestArticles, moduleLinkMap: _moduleLinkMap, locale }: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cloverretribution.wiki";
  const mobileBannerAd = getPreferredMobileBannerSelection();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Clover Retribution Wiki",
        url: siteUrl,
        logo: `${siteUrl}/images/hero.webp`,
        image: `${siteUrl}/images/hero.webp`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Clover Retribution Wiki",
        description: "Clover Retribution wiki for codes, tier lists, builds, and update tracking.",
      },
      {
        "@type": "VideoObject",
        name: "Clover Retribution Release Stream and Gameplay",
        description: "Release stream showcase and gameplay overview for Clover Retribution.",
        uploadDate: "2023-07-14",
        thumbnailUrl: "https://i.ytimg.com/vi/oK8inrGmfpQ/hqdefault.jpg",
        embedUrl: "https://www.youtube.com/embed/oK8inrGmfpQ",
        contentUrl: "https://www.youtube.com/watch?v=oK8inrGmfpQ",
      },
    ],
  };

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>
      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">{t.hero.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">{t.hero.title}</h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">{t.hero.description}</p>
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <a href="https://discord.com/invite/clover-retribution" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white rounded-lg font-semibold text-base md:text-lg transition-colors">
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a href="https://www.roblox.com/games/10912405603/Clover-Retribution" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 border border-border hover:bg-white/10 rounded-lg font-semibold text-base md:text-lg transition-colors">
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="oK8inrGmfpQ"
              title={t.gameFeature.title}
              posterSrc="https://i.ytimg.com/vi/oK8inrGmfpQ/hqdefault.jpg"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.tools.title} <span className="text-[hsl(var(--nav-theme-light))]">{t.tools.titleHighlight}</span></h2>
            <p className="text-base md:text-lg text-muted-foreground">{t.tools.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => (
              <a
                key={index}
                href={`#${card.sectionId}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(card.sectionId);
                }}
                className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                  <DynamicIcon name={card.icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
                </div>
                <h3 className="mb-1.5 text-sm md:text-base font-semibold">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      {mobileBannerAd && (
        <AdBanner type={mobileBannerAd.type} adKey={mobileBannerAd.adKey} className="md:hidden" />
      )}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} className="hidden md:flex" />

      <section id="codes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl"><div className="text-center mb-8 md:mb-12"><h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.cloverRetributionCodes.title}</h2><p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.cloverRetributionCodes.intro}</p></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{t.modules.cloverRetributionCodes.items.map((item: any, i: number) => <div key={i} className="p-6 bg-white/5 border border-border rounded-xl"><div className="flex items-center justify-between mb-3"><span className="font-mono text-sm text-[hsl(var(--nav-theme-light))]">{item.code}</span><span className="text-xs px-2 py-1 rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)]">{item.priority}</span></div><p className="font-semibold mb-2">{item.reward}</p><p className="text-sm text-muted-foreground">{item.requirements}</p></div>)}</div></div>
      </section>

      <section id="trello-discord-links" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl"><div className="text-center mb-8 md:mb-12"><h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.cloverRetributionTrelloDiscordLinks.title}</h2><p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.cloverRetributionTrelloDiscordLinks.intro}</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{t.modules.cloverRetributionTrelloDiscordLinks.items.map((item: any, i: number) => <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"><div className="flex items-center justify-between mb-2"><p className="font-semibold">{item.label}</p><Link2 className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" /></div><p className="text-sm text-muted-foreground">{item.useFor}</p></a>)}</div></div>
      </section>

      <section id="beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl"><div className="text-center mb-8 md:mb-12"><h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.cloverRetributionBeginnerGuide.title}</h2><p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.cloverRetributionBeginnerGuide.intro}</p></div>
        <div className="space-y-3 md:space-y-4">{t.modules.cloverRetributionBeginnerGuide.items.map((step: any, i: number) => <div key={i} className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl"><div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]"><span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">{step.step}</span></div><div><h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">{step.title}</h3><p className="text-sm md:text-base text-muted-foreground">{step.body}</p></div></div>)}</div></div>
      </section>

      <section id="magic-grimoire-tier-list" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl"><div className="text-center mb-8 md:mb-12"><h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.cloverRetributionMagicGrimoireTierList.title}</h2><p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.cloverRetributionMagicGrimoireTierList.intro}</p></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{t.modules.cloverRetributionMagicGrimoireTierList.items.map((tier: any, i: number) => <div key={i} className="p-6 bg-white/5 border border-border rounded-xl"><p className="text-xs mb-2 text-[hsl(var(--nav-theme-light))]">Tier {tier.tier}</p><h3 className="font-bold mb-3">{tier.label}</h3><ul className="space-y-2">{tier.entries.map((entry: any, j: number) => <li key={j} className="text-sm text-muted-foreground"><span className="text-foreground font-medium">{entry.name}</span> · {entry.role}</li>)}</ul></div>)}</div></div>
      </section>

      <section id="race-tier-list" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl"><div className="text-center mb-8 md:mb-12"><h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.cloverRetributionRaceTierList.title}</h2><p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.cloverRetributionRaceTierList.intro}</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{t.modules.cloverRetributionRaceTierList.items.map((tier: any, i: number) => <div key={i} className="p-6 bg-white/5 border border-border rounded-xl"><p className="text-xs mb-2 text-[hsl(var(--nav-theme-light))]">Tier {tier.tier}</p><h3 className="font-bold mb-3">{tier.label}</h3><ul className="space-y-2">{tier.entries.map((entry: any, j: number) => <li key={j} className="text-sm text-muted-foreground"><span className="text-foreground font-medium">{entry.name}</span>{entry.rarity ? <span className="ml-2 rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2 py-0.5 text-xs text-[hsl(var(--nav-theme-light))]">{entry.rarity}</span> : null}<span className="block mt-1">{entry.why}</span></li>)}</ul></div>)}</div></div>
      </section>

      <section id="traits-tier-list" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl"><div className="text-center mb-8 md:mb-12"><h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.cloverRetributionTraitsTierList.title}</h2><p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.cloverRetributionTraitsTierList.intro}</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{t.modules.cloverRetributionTraitsTierList.items.map((tier: any, i: number) => <div key={i} className="p-6 bg-white/5 border border-border rounded-xl"><p className="text-xs mb-2 text-[hsl(var(--nav-theme-light))]">Tier {tier.tier}</p><h3 className="font-bold mb-3">{tier.label}</h3><ul className="space-y-2">{tier.entries.map((entry: any, j: number) => <li key={j} className="text-sm text-muted-foreground"><span className="text-foreground font-medium">{entry.name}</span>{entry.rarity ? <span className="ml-2 rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2 py-0.5 text-xs text-[hsl(var(--nav-theme-light))]">{entry.rarity}</span> : null}<span className="block mt-1">{entry.why}</span></li>)}</ul></div>)}</div></div>
      </section>

      <section id="stats-weapons-crafting-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl"><div className="text-center mb-8 md:mb-12"><h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.cloverRetributionStatsWeaponsCraftingGuide.title}</h2><p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.cloverRetributionStatsWeaponsCraftingGuide.intro}</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{t.modules.cloverRetributionStatsWeaponsCraftingGuide.items.map((item: any, i: number) => <div key={i} className="p-6 bg-white/5 border border-border rounded-xl"><div className="flex items-center justify-between gap-2 mb-2"><h3 className="font-bold">{item.name}</h3>{item.stat ? <span className="rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2 py-0.5 text-xs text-[hsl(var(--nav-theme-light))]">{item.stat}</span> : null}</div><p className="text-sm text-muted-foreground">{item.description}</p>{item.tip ? <p className="mt-2 text-sm">{item.tip}</p> : null}</div>)}</div></div>
      </section>

      <section id="update-log-devil-race-guide" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl"><div className="text-center mb-8 md:mb-12"><h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.cloverRetributionUpdateLogDevilRaceGuide.title}</h2><p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.cloverRetributionUpdateLogDevilRaceGuide.intro}</p></div>
        <div className="space-y-3 md:space-y-4">{t.modules.cloverRetributionUpdateLogDevilRaceGuide.items.map((entry: any, i: number) => <div key={i} className="p-5 bg-white/5 border border-border rounded-xl"><div className="flex flex-wrap items-center gap-2 mb-2"><BellRing className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />{entry.date ? <span className="rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2 py-0.5 text-xs text-[hsl(var(--nav-theme-light))]">{entry.date}</span> : null}{entry.tag ? <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">{entry.tag}</span> : null}</div><p className="font-semibold mb-1">{entry.title}</p><p className="text-sm text-muted-foreground">{entry.description}</p></div>)}</div></div>
      </section>

      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} className="hidden md:flex" />

      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection title={t.faq.title} titleHighlight={t.faq.titleHighlight} subtitle={t.faq.subtitle} questions={t.faq.questions} />
      </Suspense>
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection title={t.cta.title} description={t.cta.description} joinCommunity={t.cta.joinCommunity} joinGame={t.cta.joinGame} />
      </Suspense>
    </div>
  );
}
