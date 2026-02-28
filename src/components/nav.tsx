"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  HeartPulse,
  LayoutDashboard,
  GlassWater,
  Smile,
  Bell,
  LineChart,
  Bot,
  Settings,
  Trophy,
  BookHeart,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useTranslation } from '@/lib/i18n/client'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/icons"
import { Button } from "./ui/button"

export function Nav({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'common');
  const pathname = usePathname()

  const navItems = [
    { href: `/${lng}`, label: t('sidebar_dashboard'), icon: LayoutDashboard },
    { href: `/${lng}/health`, label: t('sidebar_health_tracking'), icon: HeartPulse },
    { href: `/${lng}/journal`, label: t('sidebar_journal'), icon: BookHeart },
    { href: `/${lng}/water`, label: t('sidebar_water_intake'), icon: GlassWater },
    { href: `/${lng}/skincare`, label: t('sidebar_skincare'), icon: Smile },
    { href: `/${lng}/reminders`, label: t('sidebar_reminders'), icon: Bell },
    { href: `/${lng}/reports`, label: t('sidebar_reports'), icon: LineChart },
    { href: `/${lng}/achievements`, label: t('sidebar_achievements'), icon: Trophy },

    // ⭐ NEW PAGE (your breast awareness)
    { href: `/${lng}/breast-awareness`, label: "Breast Awareness", icon: HeartPulse },

    { href: `/${lng}/chatbot`, label: t('sidebar_ai_assistant'), icon: Bot },
    { href: `/${lng}/settings`, label: t('sidebar_settings'), icon: Settings },
  ]

  const mainPath = pathname.substring(pathname.indexOf('/', 1))
  const activePath = `/${lng}${mainPath === `/${lng}` ? '' : mainPath}`.replace(/\/$/, '')

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Logo className="text-primary" />
          <h1 className="text-lg sm:text-xl font-semibold font-headline">LunaWell</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={activePath === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="hidden flex-col gap-2 group-data-[state=expanded]:flex">
          <h3 className="font-semibold text-sm font-headline">Need a Digital Detox?</h3>
          <p className="text-xs text-muted-foreground">
            Log out to take a break and focus on your wellbeing offline.
          </p>
          <Button variant="secondary" size="sm" className="w-full" asChild>
            <Link href={`/${lng}/login`}>{t('logout')}</Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}