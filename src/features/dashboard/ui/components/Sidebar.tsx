"use client";

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
  useSidebar,
} from "@/components/sidebar";
import { Avatar, AvatarFallback } from "@/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import { logoutUsecase } from "@/features/auth/application/logout.usecase.client";
import { adminMenuItems, menuItems } from "../data";
import { useSelector } from "react-redux";
import { RootState } from "shared/store/store";
import Link from "next/link";
import Image from "next/image";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const currentMenuItems = user?.role === "ADMIN" ? adminMenuItems : menuItems;

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
                  <SidebarMenuButton
                    asChild
                    className={`transition-colors ${pathname === item.url ? "bg-light-green" : "hover:bg-light-green"}`}
                  >
                    <Link href={item.url} onClick={handleMenuClick} className="flex items-center gap-3 px-3 py-2.5">
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
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:bg-sidebar-accent flex h-auto items-center gap-3 rounded-lg p-2 transition-colors">
                <Avatar className="border-background h-10 w-10 border-4 shadow-lg">
                  <AvatarFallback className="bg-primary text-black">
                    {user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col text-left">
                  <span className="text-sidebar-foreground truncate text-sm font-semibold">{user.name}</span>
                  <span title={user.email} className="text-sidebar-foreground/60 truncate text-xs">
                    {user.email}
                  </span>
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
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
