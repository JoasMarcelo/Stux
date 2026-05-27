"use client";

import { Home, Timer, History, Flame, HelpCircle, Settings, Award, Zap, Trophy as TrophyIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MARKS, TROPHIES } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Cronômetro",
    url: "/timer",
    icon: Timer,
  },
  {
    title: "Histórico",
    url: "/history",
    icon: History,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="group/header relative flex items-center gap-2 transition-all duration-300">
          <div className={`flex items-center gap-2 transition-all duration-300 w-full ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white transition-opacity group-hover/header:opacity-10">
              <Flame className="h-5 w-5 fill-current" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold tracking-tight truncate animate-in fade-in duration-500 group-hover/header:opacity-10">
                Stux
              </span>
            )}
          </div>
          
          <div className={`absolute inset-0 flex items-center opacity-0 group-hover/header:opacity-100 transition-opacity ${isCollapsed ? 'justify-center' : 'justify-start pl-0.5'}`}>
            <SidebarTrigger className="h-7 w-7 bg-background shadow-md border rounded-lg" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Dialog>
              <DialogTrigger asChild>
                <SidebarMenuButton tooltip="Como funciona">
                  <HelpCircle />
                  <span>Como funciona?</span>
                </SidebarMenuButton>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Zap className="text-orange-500" />
                    O Sistema Stux
                  </DialogTitle>
                  <DialogDescription>
                    Entenda como a progressão e o calor da chama ajudam você a vencer a procrastinação.
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="marcas" className="mt-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="marcas">Marcas</TabsTrigger>
                    <TabsTrigger value="calor">Calor (Ofensiva)</TabsTrigger>
                    <TabsTrigger value="trofeus">Troféus</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="marcas" className="space-y-4 pt-4">
                    <h3 className="font-bold text-lg">Sistema de Marcas</h3>
                    <p className="text-sm text-muted-foreground">
                      O Stux usa marcos incrementais. Comece com apenas 2% da sua meta (Bronze) para quebrar a inércia.
                    </p>
                    <div className="grid gap-2">
                      {MARKS.slice(1).map((mark) => (
                        <div key={mark.level} className="flex items-center justify-between p-2 rounded-md bg-muted/50 border text-sm">
                          <span className={`font-bold ${mark.color}`}>{mark.label}</span>
                          <Badge variant="outline">{mark.percentage}% da meta</Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="calor" className="space-y-4 pt-4">
                    <h3 className="font-bold text-lg text-orange-600 flex items-center gap-2">
                      <Flame className="w-5 h-5" />
                      Calor da Chama
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Diferente de streaks binárias, o calor aumenta gradualmente. Quanto maior seu nível no dia, mais calor você gera.
                    </p>
                    <div className="grid gap-2">
                      <div className="flex justify-between p-2 border rounded-md text-sm">
                        <span>Nível Ascensão</span>
                        <span className="text-rose-500 font-bold">+5 Calor</span>
                      </div>
                      <div className="flex justify-between p-2 border rounded-md text-sm">
                        <span>Nível Lendário</span>
                        <span className="text-purple-500 font-bold">+4 Calor</span>
                      </div>
                      <div className="flex justify-between p-2 border rounded-md text-sm">
                        <span>Nível Diamante/Esmeralda</span>
                        <span className="text-blue-500 font-bold">+3 Calor</span>
                      </div>
                      <div className="flex justify-between p-2 border rounded-md text-sm">
                        <span>Nível Ouro</span>
                        <span className="text-yellow-500 font-bold">+2 Calor</span>
                      </div>
                      <div className="flex justify-between p-2 border rounded-md text-sm">
                        <span>Nível Bronze/Prata</span>
                        <span className="text-muted-foreground font-bold">Mantém</span>
                      </div>
                      <div className="flex justify-between p-2 border rounded-md text-sm bg-red-500/5">
                        <span>Sem estudo</span>
                        <span className="text-red-500 font-bold">-2 Calor</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="trofeus" className="space-y-4 pt-4">
                    <h3 className="font-bold text-lg text-yellow-600 flex items-center gap-2">
                      <TrophyIcon className="w-5 h-5" />
                      Troféus de Progressão
                    </h3>
                    <div className="space-y-4">
                      {TROPHIES.map((phase) => (
                        <div key={phase.phase} className="space-y-2">
                          <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">
                            Fase {phase.phase}: {phase.name}
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {phase.items.map((item) => (
                              <div key={item.name} className="p-2 border rounded-md text-xs flex justify-between items-center">
                                <span>{item.name}</span>
                                <Badge variant="secondary">{item.threshold} Calor</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/settings'} tooltip="Configurações">
              <Link href="/settings">
                <Settings />
                <span>Configurações</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
