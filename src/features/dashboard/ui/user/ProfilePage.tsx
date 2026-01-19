"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { Avatar, AvatarFallback } from "@/components/avatar";
import { User, Mail, Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "shared/store/store";

export function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-foreground text-3xl font-bold">Mi Perfil</h1>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="relative py-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="border-background h-32 w-32 border-4 shadow-lg">
              <AvatarFallback className="bg-primary text-background text-2xl">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center">
              <h2 className="text-foreground text-2xl font-bold">
                {user?.name} {user?.lastname}
              </h2>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="text-primary h-5 w-5" />
            Información Personal
          </CardTitle>
          <CardDescription>Tus datos personales básicos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-border flex items-center justify-between border-b py-2">
            <div className="flex items-center gap-3">
              <Mail className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Email</span>
            </div>
            <span className="text-sm font-medium">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Miembro desde</span>
            </div>
            <span className="text-sm font-medium">
              {new Date(user?.createdAt || "").toLocaleDateString("es-ES")}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
