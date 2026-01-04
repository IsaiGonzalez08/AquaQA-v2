export async function meService() {
  const res = await fetch("/api/user/me");

  const data = await res.json();

  return { ...data, status: res.status, ok: res.ok };
}
