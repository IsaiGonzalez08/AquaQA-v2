"use client";

import { useState, useEffect } from "react";
import { User, Settings, LogOut, ChevronUp } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { logoutUsecase } from "@/features/auth/application/logout.usecase.client";
import { meUseCase } from "../../application/me.usecase.server";
import { adminMenuItems, menuItems } from "../data";
import { UserData } from "../types/dashboard.types";
import Link from "next/link";
import Image from "next/image";

export function AppSidebar() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await meUseCase();
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const currentMenuItems = userData?.role === "admin" ? adminMenuItems : menuItems;

  const handleLogout = async () => {
    await logoutUsecase();
    router.replace("/");
  };

  return (
    <Sidebar className="border-sidebar-border border-r">
      <SidebarHeader className="ml-2 flex flex-row items-center border-b border-none py-6">
        <Image src="/aquaQA.svg" alt="AquaQA Logo" width={35} height={35} priority />
        <h2 className="text-primary text-xl font-bold">AquaQA</h2>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {currentMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-sidebar-accent transition-colors">
                    <Link href={item.url} className="flex items-center gap-3 px-3 py-2.5">
                      <item.icon className="text-sidebar-foreground h-5 w-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border border-t p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-sidebar-accent flex w-full items-center gap-3 rounded-lg p-2 transition-colors">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col text-left">
                <span className="text-sidebar-foreground text-sm font-semibold">{userData?.name || ""}</span>
                <span className="text-sidebar-foreground/60 text-xs">{userData?.email || ""}</span>
              </div>
              <ChevronUp className="text-sidebar-foreground/60 h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/user/profile" className="flex cursor-pointer items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/user/settings" className="flex cursor-pointer items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600">
              <button onClick={handleLogout} className="flex cursor-pointer items-center">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
