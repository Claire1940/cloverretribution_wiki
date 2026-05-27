import type { LucideIcon } from 'lucide-react'
import { BookOpen, Gift, Link2, Sparkles, Swords, Trophy } from 'lucide-react'

export interface NavigationItem {
	key: string
	path: string
	icon: LucideIcon
	isContentType: boolean
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'codes', path: '/codes', icon: Gift, isContentType: true },
	{ key: 'links', path: '/links', icon: Link2, isContentType: true },
	{ key: 'tier', path: '/tier', icon: Trophy, isContentType: true },
	{ key: 'guide', path: '/guide', icon: BookOpen, isContentType: true },
	{ key: 'builds', path: '/builds', icon: Swords, isContentType: true },
	{ key: 'magic', path: '/magic', icon: Sparkles, isContentType: true },
]

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
)

export type ContentType = (typeof CONTENT_TYPES)[number]

export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
