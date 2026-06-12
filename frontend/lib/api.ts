const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function fetchContent(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${API_URL}/api/content`, { cache: 'no-store' });
    if (!res.ok) return {};
    return res.json();
  } catch { return {}; }
}

export async function fetchEvents() {
  try {
    const res = await fetch(`${API_URL}/api/agenda`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export async function fetchDocuments() {
  try {
    const res = await fetch(`${API_URL}/api/documents`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export async function fetchReferences() {
  try {
    const res = await fetch(`${API_URL}/api/references`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export async function fetchTestimonials() {
  try {
    const res = await fetch(`${API_URL}/api/testimonials`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export async function fetchPosts() {
  try {
    const res = await fetch(`${API_URL}/api/posts`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export async function fetchInstagram() {
  try {
    const res = await fetch(`${API_URL}/api/instagram?limit=9`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}
