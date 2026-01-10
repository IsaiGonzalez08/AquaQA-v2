export async function meService() {
  const res = await fetch("/api/user/me");

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return { ...data, status: res.status, ok: res.ok };
}
