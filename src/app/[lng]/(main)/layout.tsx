import { use } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Nav } from "@/components/nav"
import { KikiAssistantLink } from '@/components/kiki-assistant-link';
import { UserAvatarMenu } from '@/components/user-avatar-menu';

export default function MainLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  const { lng } = use(params);
  return (
    <SidebarProvider>
      <Nav lng={lng} />
      <SidebarInset className="bg-background flex flex-col">
        <header className="p-4 md:p-6 flex items-center gap-4">
           <SidebarTrigger className="md:hidden" />
           <div className="flex-1" />
           <div className="flex items-center gap-4">
            <UserAvatarMenu />
           </div>
        </header>
        <main className="p-4 md:p-6 pt-0 flex-1">
          {children}
        </main>
        <KikiAssistantLink lng={lng} />
      </SidebarInset>
    </SidebarProvider>
  )
}
