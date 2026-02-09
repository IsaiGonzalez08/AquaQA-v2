# Dashboard Feature - Arquitectura

## 📁 Estructura del Feature

```
dashboard/
├── application/           # Lógica de negocio (Custom Hooks)
│   ├── useRequests.hook.ts
│   ├── useRequestFilters.hook.ts
│   └── useRequestActions.hook.ts
├── services/             # Servicios HTTP
│   ├── requestsHttp.service.ts
│   └── meHttp.service.ts
├── ui/                   # Componentes de UI
│   ├── admin/
│   │   ├── components/   # Componentes reutilizables
│   │   │   ├── KPICard.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── RequestFilters.tsx
│   │   │   ├── RequestsTable.tsx
│   │   │   └── RequestDetailModal.tsx
│   │   ├── types/
│   │   │   └── request.types.ts
│   │   ├── InitPage.tsx      # Dashboard principal
│   │   └── RequestPage.tsx   # Gestión de solicitudes
│   └── user/
└── README.md
```

## 🎯 Principios de Arquitectura

### 1. **Separación de Responsabilidades**

- **`application/`**: Contiene toda la lógica de negocio en custom hooks
- **`services/`**: Maneja comunicación con APIs
- **`ui/`**: Solo componentes visuales, sin lógica compleja

### 2. **Custom Hooks (Application Layer)**

#### `useRequests.hook.ts`
**Responsabilidad**: Gestión del estado y fetching de solicitudes

```typescript
const {
  allRequests,      // Todas las solicitudes cargadas
  isLoading,        // Estado de carga inicial
  isRefreshing,     // Estado de refresh manual/automático
  error,            // Errores de carga
  lastFetchTime,    // Timestamp de última actualización
  updateRequestInCache, // Actualizar cache localmente
  refetch,          // Refrescar datos manualmente
} = useRequests();
```

**Features**:
- Polling automático cada 2 minutos
- Cache local para evitar peticiones innecesarias
- Optimistic updates

#### `useRequestFilters.hook.ts`
**Responsabilidad**: Filtrado y paginación del lado del cliente

```typescript
const {
  currentPage,
  setCurrentPage,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
  filteredRequests,  // Datos filtrados y paginados
  total,
  totalPages,
} = useRequestFilters({ requests: allRequests, pageSize: 10 });
```

**Features**:
- Filtrado por estado (PENDING, APPROVED, REJECTED, ALL)
- Búsqueda por nombre/email
- Paginación del lado del cliente (sin peticiones adicionales)

#### `useRequestActions.hook.ts`
**Responsabilidad**: Acciones sobre solicitudes (aprobar/rechazar)

```typescript
const {
  isActionLoading,
  approveRequest,
  rejectRequest,
} = useRequestActions({
  onSuccess: handleSuccess,
  onError: handleError,
  updateCache: updateRequestInCache,
});
```

**Features**:
- Optimistic updates
- Callbacks de éxito/error
- Integración con cache

### 3. **Componentes de UI Extraídos**

#### `RequestFilters.tsx`
Componente responsable de:
- Barra de búsqueda
- Botón de refresh manual
- Filtros por estado
- Timestamp de última actualización

**Responsive**: Grid 2x2 en móvil, 1x4 en desktop

#### `RequestsTable.tsx`
Componente responsable de:
- Tabla de solicitudes
- Estados de loading/error/empty
- Paginación
- Acciones por fila

**Responsive**: Scroll horizontal en móvil, tabla completa en desktop

#### `RequestDetailModal.tsx`
Modal con detalles completos de una solicitud:
- Información del usuario
- Estado actual
- Tiempo de espera
- Acciones (aprobar/rechazar con motivo)

## 🔄 Flujo de Datos

```
┌─────────────────┐
│  RequestPage    │ (Componente principal)
└────────┬────────┘
         │
         ├──► useRequests() ──────► getAllRequestsService()
         │                          └─► API: /api/admin/requests
         │
         ├──► useRequestFilters() ──► Filtrado local (useMemo)
         │
         ├──► useRequestActions() ──► updateRequestStatusService()
         │                            └─► API: /api/admin/requests/:id/status
         │
         └──► useToast() ──────────► Notificaciones visuales
```

## 🎨 Sistema de Notificaciones

### Toast Provider
Ubicación: `@/shared/components/ui/toast.tsx`

**Uso**:
```typescript
const { showToast } = useToast();

showToast("success", "Operación exitosa");
showToast("error", "Ocurrió un error");
showToast("warning", "Advertencia");
showToast("info", "Información");
```

**Características**:
- Auto-dismiss después de 3 segundos
- Animaciones de entrada/salida
- Posicionamiento fijo en top-right
- Apilamiento de múltiples toasts

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Estrategias
1. **Filtros**: Grid 2x2 (móvil) → 1x4 (desktop)
2. **Tabla**: Scroll horizontal (móvil) → Tabla completa (desktop)
3. **Paginación**: Botones compactos (móvil) → Completa (desktop)
4. **Timestamp**: Oculto (móvil) → Visible (desktop)

## ⚡ Optimizaciones de Rendimiento

### 1. Fetch Único + Cache Local
- Una petición inicial trae todas las solicitudes
- Filtrado/paginación en el cliente (instantáneo)
- Sin loading spinners en cada interacción

### 2. Polling Inteligente
- Auto-refresh cada 2 minutos en background
- No interrumpe al usuario
- Configurable en `useRequests({ pollingInterval: ms })`

### 3. Optimistic Updates
- UI se actualiza inmediatamente
- Petición al servidor en background
- Rollback automático si falla

### 4. Memoización
- `useMemo` para filtrado/paginación
- Evita recálculos innecesarios
- Mejora performance en listas grandes

## 🧪 Testing (Futuro)

### Unit Tests
```typescript
// useRequests.test.ts
describe('useRequests', () => {
  it('should fetch requests on mount', async () => {
    // ...
  });
});
```

### Integration Tests
```typescript
// RequestPage.test.tsx
describe('RequestPage', () => {
  it('should filter requests by status', () => {
    // ...
  });
});
```

## 📝 Mantenimiento

### Agregar un Nuevo Filtro
1. Actualizar `useRequestFilters.hook.ts`
2. Agregar UI en `RequestFilters.tsx`
3. Listo! No tocar `RequestPage.tsx`

### Agregar una Nueva Acción
1. Crear función en `useRequestActions.hook.ts`
2. Agregar botón en `RequestsTable.tsx` o modal
3. Integrar en `RequestPage.tsx`

### Cambiar Intervalo de Polling
```typescript
// RequestPage.tsx
const { ... } = useRequests({ pollingInterval: 5 * 60 * 1000 }); // 5 minutos
```

## 🚀 Mejoras Futuras

- [ ] Agregar filtros avanzados (fecha, rango)
- [ ] Exportar solicitudes a CSV/Excel
- [ ] Notificaciones push para nuevas solicitudes
- [ ] Historial de acciones del admin
- [ ] Búsqueda con debounce para listas muy grandes
- [ ] Virtualización de tabla para 1000+ items
