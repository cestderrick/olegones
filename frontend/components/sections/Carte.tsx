'use client';
import { useEffect, useRef } from 'react';

interface CarteProps {
  venueName: string;
  venueAddress: string;
  lat: number;
  lng: number;
  radius: number;
}

export default function Carte({ venueName, venueAddress, lat, lng, radius }: CarteProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!mapRef.current || initialized.current) return;

    let map: any = null;

    const initMap = () => {
      const L = (window as any).L;
      if (!L || !mapRef.current) return;

      initialized.current = true;

      map = L.map(mapRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([lat, lng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      // Cercle zone d'activité
      L.circle([lat, lng], {
        color: '#330091',
        fillColor: '#330091',
        fillOpacity: 0.07,
        weight: 2,
        radius,
      }).addTo(map);

      // Marker — couleurs hardcodées (CSS vars pas accessibles dans Leaflet)
      const icon = L.divIcon({
        html: `<div style="background:#ff5e54;color:white;padding:7px 14px;border-radius:20px;font-weight:800;font-size:13px;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,0.25);transform:translateX(-50%);pointer-events:none;">📍 ${venueName}</div>`,
        className: '',
        iconAnchor: [0, 8],
      });

      L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(`<strong>${venueName}</strong><br><span style="color:#666;font-size:13px">${venueAddress}</span>`, {
          offset: [0, -10],
        });

      // Forcer le recalcul de taille après affichage
      setTimeout(() => map && map.invalidateSize(), 300);
    };

    // Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Leaflet JS — si déjà chargé, init directement
    if ((window as any).L) {
      initMap();
    } else if (!document.getElementById('leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      // Script en cours de chargement — attendre
      const poll = setInterval(() => {
        if ((window as any).L) { clearInterval(poll); initMap(); }
      }, 50);
    }

    return () => {
      if (map) { map.remove(); initialized.current = false; }
    };
  }, [lat, lng, radius, venueName, venueAddress]);

  return (
    <section id="carte" className="py-20 px-6" style={{ background: 'var(--color-light)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 reveal">
          <span
            className="inline-block text-xs font-800 uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: 'var(--color-primary)', color: 'white' }}
          >
            Où nous trouver
          </span>
          <h2 className="text-3xl md:text-4xl font-900" style={{ color: 'var(--color-primary)' }}>
            Nos ateliers à {venueAddress.split(',')[0]}
          </h2>
          <p className="text-gray-500 mt-3 text-sm">
            Les ateliers se tiennent au <strong style={{ color: 'var(--color-primary)' }}>{venueName}</strong> — {venueAddress}
          </p>
        </div>

        <div
          className="reveal rounded-3xl overflow-hidden shadow-lg border-2"
          style={{ borderColor: 'var(--color-primary)' }}
        >
          <div
            ref={mapRef}
            style={{ width: '100%', height: '420px', display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
}
