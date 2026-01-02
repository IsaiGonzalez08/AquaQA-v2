import { Spinner } from "./spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-xs">
      <Spinner className="text-primary size-10" />
    </div>
  );
}
