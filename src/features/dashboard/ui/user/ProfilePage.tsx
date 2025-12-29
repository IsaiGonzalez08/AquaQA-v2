"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, Calendar, MapPin, Edit3 } from "lucide-react";

interface UserData {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/me");
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold">Mi Perfil</h1>
          <p className="text-muted-foreground mt-1">Gestiona tu información personal y preferencias</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="gap-2">
            <Edit3 className="h-4 w-4" />
            {isEditing ? "Cancelar" : "Editar"}
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="from-primary to-secondary h-32"></div>
        <CardContent className="relative pb-6">
          <div className="-mt-16 flex flex-col items-center gap-4 sm:-mt-12 sm:flex-row sm:items-end">
            <Avatar className="border-background h-32 w-32 border-4 shadow-lg">
              <AvatarFallback className="bg-primary text-background text-2xl">
                {userData?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="mb-4 flex-1 text-center sm:mb-0 sm:text-left">
              <h2 className="text-foreground text-2xl font-bold">{userData?.name}</h2>
              <p className="text-muted-foreground">{userData?.role}</p>
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
            <span className="text-sm font-medium">{userData?.email}</span>
          </div>
          <div className="border-border flex items-center justify-between border-b py-2">
            <div className="flex items-center gap-3">
              <Phone className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Teléfono</span>
            </div>
          </div>
          <div className="border-border flex items-center justify-between border-b py-2">
            <div className="flex items-center gap-3">
              <MapPin className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Ubicación</span>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Miembro desde</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
