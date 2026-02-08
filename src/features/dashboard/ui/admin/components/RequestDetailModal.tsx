"use client";

import { Request } from "../types/request.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { StatusBadge } from "./StatusBadge";
import { Calendar, Mail, User, FileText, Clock } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/textarea";

interface RequestDetailModalProps {
  request: Request | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string, reason: string) => void;
  isLoading?: boolean;
}

export function RequestDetailModal({
  request,
  isOpen,
  onClose,
  onApprove,
  onReject,
  isLoading = false,
}: RequestDetailModalProps) {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  if (!request) return null;

  const handleReject = () => {
    if (rejectReason.trim()) {
      onReject(request.id, rejectReason);
      setRejectReason("");
      setShowRejectForm(false);
    }
  };

  const handleClose = () => {
    setShowRejectForm(false);
    setRejectReason("");
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getWaitingTime = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diffDays > 0) {
      return `${diffDays} día${diffDays > 1 ? "s" : ""} ${diffHours}h`;
    }
    return `${diffHours} hora${diffHours !== 1 ? "s" : ""}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalle de Solicitud</span>
            <StatusBadge status={request.status} />
          </DialogTitle>
          <DialogDescription>Información completa del usuario y su solicitud de acceso</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span className="font-medium">Nombre completo</span>
              </div>
              <p className="text-base font-semibold">
                {request.name} {request.lastname}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <span className="font-medium">Correo electrónico</span>
              </div>
              <p className="text-base font-semibold">{request.email}</p>
            </div>

            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Fecha de solicitud</span>
              </div>
              <p className="text-base">{formatDate(request.createdAt)}</p>
            </div>

            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Tiempo en espera</span>
              </div>
              <p className="text-base">{getWaitingTime(request.createdAt)}</p>
            </div>
          </div>

          {request.problemDescription && (
            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Descripción del problema</span>
              </div>
              <p className="bg-muted/50 rounded-md border p-3 text-sm">{request.problemDescription}</p>
            </div>
          )}

          {showRejectForm && (
            <div className="space-y-2">
              <label htmlFor="reject-reason" className="text-sm font-medium">
                Motivo del rechazo *
              </label>
              <Textarea
                id="reject-reason"
                placeholder="Ingresa el motivo del rechazo..."
                value={rejectReason}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRejectReason(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          {request.status === "PENDING" && !showRejectForm && (
            <>
              <Button variant="ghost" onClick={handleClose} disabled={isLoading}>
                Cancelar
              </Button>
              <Button variant="secondary" onClick={() => setShowRejectForm(true)} disabled={isLoading}>
                Rechazar
              </Button>
              <Button onClick={() => onApprove(request.id)} disabled={isLoading}>
                Aprobar
              </Button>
            </>
          )}

          {showRejectForm && (
            <>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowRejectForm(false);
                  setRejectReason("");
                }}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button variant="secondary" onClick={handleReject} disabled={isLoading || !rejectReason.trim()}>
                Confirmar Rechazo
              </Button>
            </>
          )}

          {request.status !== "PENDING" && <Button onClick={handleClose}>Cerrar</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
