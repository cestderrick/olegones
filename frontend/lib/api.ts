const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function fetchContent(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${API_URL}/api/content`, { next: { revalidate: 60 } });
    if (!res.ok) return {};
    return res.json();
  } catch { return {}; }
}

export async function fetchEvents() {
  try {
    const res = await fetch(`${API_URL}/api/agenda`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export async function fetchDocuments() {
  try {
    const res = await fetch(`${API_URL}/api/documents`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export async function fetchReferences() {
  try {
    const res = await fetch(`${API_URL}/api/references`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export async function fetchInstagram() {
  try {
    const res = await fetch(`${API_URL}/api/instagram?limit=9`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}
